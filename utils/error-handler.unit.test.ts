import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { z } from "zod"
import { Prisma } from "@prisma/client"
import { ok, err } from "./result"
import { handleError, CustomError } from "./error-handler"

describe("ok/err", () => {
  it("ok wraps data in a success Result", () => {
    expect(ok(42)).toEqual({ ok: true, data: 42 })
  })

  it("err wraps an AppError in a failure Result", () => {
    expect(err({ code: "1234" })).toEqual({ ok: false, error: { code: "1234" } })
  })
})

describe("handleError", () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {})
  })

  afterEach(() => {
    consoleErrorSpy.mockRestore()
  })

  it("maps a ZodError to the first validation message", () => {
    const schema = z.object({ name: z.string().min(1, "name is required") })
    const result = schema.safeParse({ name: "" })
    expect(result.success).toBe(false)
    if (result.success) throw new Error("expected failure")

    const handled = handleError(result.error)
    expect(handled).toEqual({ ok: false, error: { message: "name is required" } })
  })

  it("maps a known Prisma error code via the provided custom map", () => {
    const prismaError = new Prisma.PrismaClientKnownRequestError("Unique constraint failed", {
      code: "P2002",
      clientVersion: "5.13.0",
    })
    const handled = handleError(prismaError, { P2002: "1500" })
    expect(handled).toEqual({ ok: false, error: { code: "1500" } })
  })

  it("falls back to the unknown error code for a Prisma error not present in the custom map", () => {
    const prismaError = new Prisma.PrismaClientKnownRequestError("Foreign key violation", {
      code: "P2003",
      clientVersion: "5.13.0",
    })
    const handled = handleError(prismaError, { P2002: "1500" })
    expect(handled).toEqual({ ok: false, error: { code: "9000" } })
  })

  it("maps a CustomError code found in the custom map", () => {
    const error = new CustomError("row not found", "NOT_FOUND_ROW")
    const handled = handleError(error, { NOT_FOUND_ROW: "2000" })
    expect(handled).toEqual({ ok: false, error: { code: "2000" } })
  })

  it("falls back to the default error code map for a CustomError not in the custom map", () => {
    const error = new CustomError("missing", "NOT_FOUND")
    const handled = handleError(error, { P2002: "1500" })
    expect(handled).toEqual({ ok: false, error: { code: "9001" } })
  })

  it("falls back to the unknown code for a CustomError absent from both maps", () => {
    const error = new CustomError("mystery", "SOMETHING_ELSE")
    const handled = handleError(error, { P2002: "1500" })
    expect(handled).toEqual({ ok: false, error: { code: "9000" } })
  })

  it("falls back to the unknown code for an unrecognized error type", () => {
    const handled = handleError(new Error("plain error"))
    expect(handled).toEqual({ ok: false, error: { code: "9000" } })
  })

  it("falls back to the unknown code when a non-Error value is thrown", () => {
    const handled = handleError("just a string")
    expect(handled).toEqual({ ok: false, error: { code: "9000" } })
  })

  it("uses the default error code map when no custom map is provided", () => {
    const error = new CustomError("unauthenticated", "NOT_AUTHENTICATED")
    const handled = handleError(error)
    expect(handled).toEqual({ ok: false, error: { code: "9002" } })
  })
})

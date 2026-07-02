export type AppError = { code: string } | { message: string }
export type Result<T> = { ok: true; data: T } | { ok: false; error: AppError }

export const ok = <T>(data: T): Result<T> => ({ ok: true, data })
export const err = (error: AppError): Result<never> => ({ ok: false, error })

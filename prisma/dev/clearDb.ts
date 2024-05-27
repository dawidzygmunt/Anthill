import prisma from "../../lib/db"

export const clearDb = async () => {
  console.log("Clearing db...")

  try {
    const allProperties = Reflect.ownKeys(Object.getPrototypeOf(prisma))
    const modelNames = allProperties.filter(
      (x) =>
        x !== "constructor" &&
        x !== "on" &&
        x !== "connect" &&
        x !== "runDisconnect" &&
        x !== "disconnect" &&
        x !== "$metrics"
      // typeof (prisma as any)[x] === "object" // Ensure it is a model
    )

    console.log(modelNames)

    for (const modelName of modelNames) {
      console.log(modelName)

      await (prisma as any)[modelName].deleteMany()
    }
  } catch (err) {
    console.log(err)
  } finally {
  }
}

clearDb()

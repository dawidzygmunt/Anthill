export const logError = (error: unknown) => {
  if (process.env.NODE_ENV !== "production") {
    console.error(error)
  }
}

export const frontErrorCodes: Record<string, string> = {
  // activities
  1000: "Activity with this name already exists!",
  1001: "Cannot delete Activity because it is associated with other tracks",
  1002: "Cannot update if it not exists",
  1003: "Activity ID is required",
  1004: "Activity not found",

  // weeks
  1500: "Week with this name already exists!",

  // tracks
  2000: "Track with this name already exists!",
  2001: "Cannot update if it not exists",
  2002: "track row already exists",
  2003: "Cannot delete track row with tracks",

  // general
  9000: "Something went wrong",
  9001: "Not Found",
  9002: "Not Authenticated",
  9003: "Not Authorized",
}

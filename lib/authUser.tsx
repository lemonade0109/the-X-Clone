import { currentUser } from "@clerk/nextjs/server";

//? Helper Functions
export async function getAuthUser() {
  const user = await currentUser();

  if (!user) throw new Error("You must be logged in to access this route...");
  return user;
}

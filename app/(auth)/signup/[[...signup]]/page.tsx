import { SignUp } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();
  if (user?.privateMetadata.hasProfile === true) redirect("/home");
  return (
    <div className=" flex items-center justify-center mt-6">
      <SignUp forceRedirectUrl={"/home"} />;
    </div>
  );
}

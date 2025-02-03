import { SignIn } from "@clerk/nextjs";

export default async function Page() {
  return (
    <div className=" flex items-center justify-center mt-6">
      <SignIn forceRedirectUrl={"/home"} />;
    </div>
  );
}

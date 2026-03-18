import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SubmitForm } from "@/components/submit-form";

export default async function SubmitApp() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Submit your app</h1>
      <p className="text-foreground/60 mb-8">
        Share what you&apos;ve built with the vibe coding community.
      </p>
      <SubmitForm />
    </div>
  );
}

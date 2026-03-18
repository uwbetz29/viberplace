import Link from "next/link";
import { auth, signIn, signOut } from "@/lib/auth";

export async function Navbar() {
  const session = await auth();

  return (
    <nav className="border-b border-border bg-surface">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-accent-light">viber</span>place
          </Link>
          <Link
            href="/apps"
            className="text-sm text-foreground/60 hover:text-foreground transition-colors"
          >
            Browse Apps
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {session?.user ? (
            <>
              <Link
                href="/submit"
                className="text-sm bg-accent hover:bg-accent/80 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Submit App
              </Link>
              <Link
                href={`/profile/${(session.user as any).username ?? session.user.name}`}
                className="flex items-center gap-2"
              >
                {session.user.image && (
                  <img
                    src={session.user.image}
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                )}
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button
                  type="submit"
                  className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                >
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button
                type="submit"
                className="text-sm bg-accent hover:bg-accent/80 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Sign in with GitHub
              </button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
}

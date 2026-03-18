import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-24 pb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          The home for
          <br />
          <span className="text-accent-light">vibe-coded</span> apps
        </h1>
        <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto mb-10">
          Built something cool with Claude Code? Ship it to Viberplace. Browse,
          share, and discover apps made by vibe coders like you.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/apps"
            className="bg-accent hover:bg-accent/80 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors"
          >
            Browse Apps
          </Link>
          <Link
            href="/submit"
            className="border border-border hover:border-foreground/30 text-foreground px-6 py-3 rounded-lg text-lg font-medium transition-colors"
          >
            Submit Yours
          </Link>
          <Link
            href="/get-started"
            className="text-foreground/60 hover:text-foreground px-6 py-3 rounded-lg text-lg font-medium transition-colors"
          >
            How it works →
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-12">
          Ridiculously easy
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-surface border border-border rounded-xl p-6">
            <div className="text-3xl font-bold text-accent-light mb-3">1</div>
            <h3 className="font-semibold mb-2">Build with AI</h3>
            <p className="text-sm text-foreground/60">
              Vibe code your app with Claude Code, Cursor, or whatever gets you
              in the zone.
            </p>
          </div>
          <div className="bg-surface border border-border rounded-xl p-6">
            <div className="text-3xl font-bold text-accent-light mb-3">2</div>
            <h3 className="font-semibold mb-2">Submit it</h3>
            <p className="text-sm text-foreground/60">
              Sign in with GitHub, fill out a quick form, and your app is listed
              on Viberplace.
            </p>
          </div>
          <div className="bg-surface border border-border rounded-xl p-6">
            <div className="text-3xl font-bold text-accent-light mb-3">3</div>
            <h3 className="font-semibold mb-2">Get discovered</h3>
            <p className="text-sm text-foreground/60">
              People browse, try, and share your creation. Build your reputation
              as a vibe coder.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-foreground/40">
          Viberplace — where vibe-coded apps find their people.
        </div>
      </footer>
    </div>
  );
}

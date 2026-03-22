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
        <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto mb-12">
          Built something cool with Claude Code? Ship it to Viberplace. Browse,
          share, and discover apps made by vibe coders like you.
        </p>

        {/* Three equal CTAs */}
        <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <Link
            href="/apps"
            className="group flex flex-col items-center gap-4 bg-surface border border-border hover:border-accent/50 rounded-2xl p-8 transition-all hover:shadow-[0_0_30px_rgba(124,58,237,0.1)]"
          >
            <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
              <svg className="w-7 h-7 text-accent-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-1 group-hover:text-accent-light transition-colors">Browse Apps</h2>
              <p className="text-sm text-foreground/50">Discover what others have built</p>
            </div>
          </Link>

          <Link
            href="/submit"
            className="group flex flex-col items-center gap-4 bg-surface border border-border hover:border-accent/50 rounded-2xl p-8 transition-all hover:shadow-[0_0_30px_rgba(124,58,237,0.1)]"
          >
            <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
              <svg className="w-7 h-7 text-accent-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-1 group-hover:text-accent-light transition-colors">Submit App</h2>
              <p className="text-sm text-foreground/50">List your app on the marketplace</p>
            </div>
          </Link>

          <Link
            href="/get-started"
            className="group flex flex-col items-center gap-4 bg-surface border border-border hover:border-accent/50 rounded-2xl p-8 transition-all hover:shadow-[0_0_30px_rgba(124,58,237,0.1)]"
          >
            <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
              <svg className="w-7 h-7 text-accent-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-1 group-hover:text-accent-light transition-colors">Get Started</h2>
              <p className="text-sm text-foreground/50">Step-by-step guide for new users</p>
            </div>
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

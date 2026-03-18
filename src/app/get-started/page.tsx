import Link from "next/link";

export default function GetStarted() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-4 pt-16 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Get your app on <span className="text-accent-light">Viberplace</span>
        </h1>
        <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
          From idea to listed on the marketplace. No gatekeepers, no complicated
          process. If you can vibe code it, you can ship it.
        </p>
      </section>

      {/* Steps */}
      <section className="max-w-3xl mx-auto px-4 pb-16">
        <div className="space-y-6">
          {/* Step 1 */}
          <div className="bg-surface border border-border rounded-xl p-8">
            <div className="flex items-start gap-5">
              <div className="text-3xl font-bold text-accent-light shrink-0 w-10">
                1
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-3">
                  Build something with AI
                </h2>
                <p className="text-foreground/60 mb-4">
                  Use{" "}
                  <a
                    href="https://docs.anthropic.com/en/docs/claude-code/overview"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-light hover:underline"
                  >
                    Claude Code
                  </a>
                  , Cursor, Windsurf, or whatever AI coding tool gets you in the
                  zone. Build a web app, a tool, a game, a utility — anything
                  that runs in a browser.
                </p>

                <div className="bg-background rounded-lg border border-border p-4 font-mono text-sm">
                  <div className="text-foreground/40 mb-2">
                    # Example: start a new app with Claude Code
                  </div>
                  <div>
                    <span className="text-accent-light">$</span> mkdir my-cool-app && cd my-cool-app
                  </div>
                  <div>
                    <span className="text-accent-light">$</span> claude
                  </div>
                  <div className="text-foreground/60 mt-2 italic">
                    &quot;Build me a recipe finder app using Next.js that lets
                    users search by ingredients they have on hand&quot;
                  </div>
                </div>

                <div className="mt-4 p-4 bg-accent/10 border border-accent/20 rounded-lg">
                  <p className="text-sm text-foreground/70">
                    <span className="font-semibold text-accent-light">
                      What counts as a &quot;vibe-coded&quot; app?
                    </span>{" "}
                    Anything you built primarily using AI assistance. It
                    doesn&apos;t have to be perfect — that&apos;s the whole
                    point. If it works and does something useful (or fun),
                    it belongs here.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-surface border border-border rounded-xl p-8">
            <div className="flex items-start gap-5">
              <div className="text-3xl font-bold text-accent-light shrink-0 w-10">
                2
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-3">
                  Deploy it somewhere
                </h2>
                <p className="text-foreground/60 mb-4">
                  Your app needs a live URL so people can actually use it. The
                  fastest way? Push to GitHub and deploy on Vercel. It&apos;s
                  free for most projects.
                </p>

                <div className="bg-background rounded-lg border border-border p-4 font-mono text-sm">
                  <div className="text-foreground/40 mb-2">
                    # Push your code to GitHub
                  </div>
                  <div>
                    <span className="text-accent-light">$</span> git init &&
                    git add -A && git commit -m &quot;first commit&quot;
                  </div>
                  <div>
                    <span className="text-accent-light">$</span> gh repo create
                    my-cool-app --public --push --source .
                  </div>
                  <div className="mt-3 text-foreground/40">
                    # Deploy to Vercel (one command)
                  </div>
                  <div>
                    <span className="text-accent-light">$</span> npx vercel
                    --prod
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <a
                    href="https://vercel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-background rounded-lg border border-border hover:border-foreground/30 transition-colors text-sm"
                  >
                    <span className="font-medium">Vercel</span>
                    <span className="text-foreground/40">— recommended</span>
                  </a>
                  <a
                    href="https://netlify.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-background rounded-lg border border-border hover:border-foreground/30 transition-colors text-sm"
                  >
                    <span className="font-medium">Netlify</span>
                    <span className="text-foreground/40">— also great</span>
                  </a>
                  <a
                    href="https://pages.github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 bg-background rounded-lg border border-border hover:border-foreground/30 transition-colors text-sm"
                  >
                    <span className="font-medium">GitHub Pages</span>
                    <span className="text-foreground/40">— static sites</span>
                  </a>
                </div>

                <div className="mt-4 p-4 bg-accent/10 border border-accent/20 rounded-lg">
                  <p className="text-sm text-foreground/70">
                    <span className="font-semibold text-accent-light">
                      Never deployed before?
                    </span>{" "}
                    No worries — just ask Claude Code: &quot;Help me deploy this
                    to Vercel.&quot; It&apos;ll walk you through the whole thing.
                    Seriously, that&apos;s all you need to do.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-surface border border-border rounded-xl p-8">
            <div className="flex items-start gap-5">
              <div className="text-3xl font-bold text-accent-light shrink-0 w-10">
                3
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-3">
                  Sign in to Viberplace
                </h2>
                <p className="text-foreground/60 mb-4">
                  Create your account in one click. We support GitHub and Google
                  sign-in — no passwords to remember, no email verification
                  hoops.
                </p>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 p-3 bg-[#24292e] rounded-lg text-white text-sm">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    Sign in with GitHub
                  </div>
                  <span className="text-foreground/40 text-sm">or</span>
                  <div className="flex items-center gap-2 p-3 bg-white rounded-lg text-gray-700 text-sm border border-gray-300">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Sign in with Google
                  </div>
                </div>

                <p className="mt-3 text-sm text-foreground/40">
                  Your profile is created automatically. You can edit it later.
                </p>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-surface border border-border rounded-xl p-8">
            <div className="flex items-start gap-5">
              <div className="text-3xl font-bold text-accent-light shrink-0 w-10">
                4
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-3">
                  Submit your app
                </h2>
                <p className="text-foreground/60 mb-4">
                  Hit the &quot;Submit App&quot; button and fill out a short
                  form. That&apos;s it. No review process, no waiting. Your app
                  goes live immediately.
                </p>

                <div className="bg-background rounded-lg border border-border p-5">
                  <h3 className="text-sm font-semibold text-foreground/80 mb-3">
                    What we&apos;ll ask you for:
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent-light mt-1.5 shrink-0" />
                      <div>
                        <span className="font-medium">App name</span>
                        <span className="text-foreground/40">
                          {" "}
                          — what you call it
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent-light mt-1.5 shrink-0" />
                      <div>
                        <span className="font-medium">Tagline</span>
                        <span className="text-foreground/40">
                          {" "}
                          — one sentence about what it does
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent-light mt-1.5 shrink-0" />
                      <div>
                        <span className="font-medium">URL</span>
                        <span className="text-foreground/40">
                          {" "}
                          — where people can use it
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent-light mt-1.5 shrink-0" />
                      <div>
                        <span className="font-medium">Description</span>
                        <span className="text-foreground/40">
                          {" "}
                          — tell people what it does and why you built it
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent-light mt-1.5 shrink-0" />
                      <div>
                        <span className="font-medium">
                          GitHub repo{" "}
                          <span className="text-foreground/40 font-normal">
                            (optional)
                          </span>
                        </span>
                        <span className="text-foreground/40">
                          {" "}
                          — share the source if you want
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent-light mt-1.5 shrink-0" />
                      <div>
                        <span className="font-medium">Tags</span>
                        <span className="text-foreground/40">
                          {" "}
                          — help people find your app (e.g. productivity, game,
                          utility)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-accent/10 border border-accent/20 rounded-lg">
                  <p className="text-sm text-foreground/70">
                    <span className="font-semibold text-accent-light">
                      Pro tip:
                    </span>{" "}
                    A good screenshot or preview image makes a huge difference.
                    Take a screenshot of your app in action and add it as your
                    image URL. You can host images on{" "}
                    <a
                      href="https://imgur.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-light hover:underline"
                    >
                      Imgur
                    </a>{" "}
                    or anywhere that gives you a direct link.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-surface border border-border rounded-xl p-8">
            <div className="flex items-start gap-5">
              <div className="text-3xl font-bold text-accent-light shrink-0 w-10">
                5
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-3">
                  You&apos;re live. Now share it.
                </h2>
                <p className="text-foreground/60 mb-4">
                  Your app gets its own page on Viberplace. Share the link
                  anywhere — Twitter/X, Discord, Reddit, your group chat. The
                  more people who see it, the better.
                </p>

                <div className="bg-background rounded-lg border border-border p-4 font-mono text-sm">
                  <span className="text-foreground/40">Your app lives at:</span>
                  <div className="mt-1 text-accent-light">
                    viberplace.com/apps/your-app-name
                  </div>
                </div>

                <div className="mt-4 p-4 bg-accent/10 border border-accent/20 rounded-lg">
                  <p className="text-sm text-foreground/70">
                    <span className="font-semibold text-accent-light">
                      What&apos;s next?
                    </span>{" "}
                    Keep building. Keep shipping. The best vibe coders on
                    Viberplace are the ones who keep putting stuff out there.
                    Every app you submit builds your profile and your reputation
                    in the community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready?</h2>
          <p className="text-foreground/60 mb-6">
            The whole process takes about 5 minutes. Probably less.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/submit"
              className="bg-accent hover:bg-accent/80 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors"
            >
              Submit Your App
            </Link>
            <Link
              href="/apps"
              className="border border-border hover:border-foreground/30 text-foreground px-6 py-3 rounded-lg text-lg font-medium transition-colors"
            >
              Browse Apps First
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          Common questions
        </h2>
        <div className="space-y-4">
          <div className="bg-surface border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-2">
              Does my app have to be built with Claude Code?
            </h3>
            <p className="text-sm text-foreground/60">
              Nope. Any AI-assisted app is welcome — Claude Code, Cursor,
              Copilot, ChatGPT, whatever. If AI helped you build it, it&apos;s a
              vibe-coded app.
            </p>
          </div>
          <div className="bg-surface border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-2">
              Does it have to be finished?
            </h3>
            <p className="text-sm text-foreground/60">
              No! MVPs, prototypes, and works-in-progress are all welcome.
              Viberplace is about shipping, not perfection. Just make sure it
              actually runs and does something.
            </p>
          </div>
          <div className="bg-surface border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-2">Is it free?</h3>
            <p className="text-sm text-foreground/60">
              Yes, completely free to list your app. Free to browse. Free to use.
              We&apos;re building a community first.
            </p>
          </div>
          <div className="bg-surface border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-2">
              Can I charge for my app?
            </h3>
            <p className="text-sm text-foreground/60">
              Right now, Viberplace links out to your app — so you handle
              monetization however you want. We&apos;re working on built-in
              payments for the future.
            </p>
          </div>
          <div className="bg-surface border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-2">
              What tech stack should I use?
            </h3>
            <p className="text-sm text-foreground/60">
              Whatever you want! Next.js, React, Vue, Svelte, plain HTML/JS — if
              it has a URL, it works on Viberplace. We recommend Next.js +
              Vercel for the easiest deploy experience.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-8">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-foreground/40">
          Viberplace — where vibe-coded apps find their people.
        </div>
      </footer>
    </div>
  );
}

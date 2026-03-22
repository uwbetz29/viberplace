"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

const STEPS = [
  { id: "signup", label: "Sign Up", shortLabel: "Sign Up", stepNum: 1 },
  { id: "build", label: "Build Your App", shortLabel: "Build", stepNum: 2 },
  { id: "deploy", label: "Deploy It", shortLabel: "Deploy", stepNum: 3 },
  { id: "submit", label: "Submit to Viberplace", shortLabel: "Submit", stepNum: 4 },
  { id: "live", label: "You're Live!", shortLabel: "Live!", stepNum: 5 },
];

function TrackerBar({ currentStep }: { currentStep: number }) {
  return (
    <div className="bg-surface border border-border rounded-2xl p-6 md:p-8">
      <div className="flex items-center justify-between relative">
        {/* Background line */}
        <div className="absolute top-5 left-[10%] right-[10%] h-1 bg-border rounded-full z-0" />
        {/* Progress line */}
        <div
          className="absolute top-5 left-[10%] h-1 bg-accent rounded-full transition-all duration-700 ease-out z-0"
          style={{
            width: `${(currentStep / (STEPS.length - 1)) * 80}%`,
          }}
        />

        {STEPS.map((step, i) => {
          const isComplete = i < currentStep;
          const isCurrent = i === currentStep;
          return (
            <div
              key={step.id}
              className="flex flex-col items-center gap-2 relative z-10 cursor-pointer"
            >
              <div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-xl transition-all duration-500 ${
                  isComplete
                    ? "bg-accent border-2 border-accent shadow-[0_0_12px_rgba(124,58,237,0.5)]"
                    : isCurrent
                    ? "bg-[#1a1030] border-2 border-accent animate-glow-pulse"
                    : "bg-surface-light border-2 border-border"
                }`}
              >
                {isComplete ? (
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span className="text-sm font-bold">{step.stepNum}</span>
                )}
              </div>
              <span
                className={`text-xs font-medium transition-colors ${
                  isComplete
                    ? "text-accent-light"
                    : isCurrent
                    ? "text-foreground"
                    : "text-foreground/40"
                }`}
              >
                <span className="hidden md:inline">{step.label}</span>
                <span className="md:hidden">{step.shortLabel}</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StepCard({
  stepNumber,
  currentStep,
  onComplete,
  children,
}: {
  stepNumber: number;
  currentStep: number;
  onComplete: () => void;
  children: React.ReactNode;
}) {
  const isComplete = stepNumber < currentStep;
  const isCurrent = stepNumber === currentStep;
  const isLocked = stepNumber > currentStep;

  return (
    <div
      className={`rounded-2xl border transition-all duration-500 overflow-hidden ${
        isComplete
          ? "bg-accent/5 border-accent/30"
          : isCurrent
          ? "bg-surface border-accent/50 shadow-[0_0_30px_rgba(124,58,237,0.1)]"
          : "bg-surface/50 border-border/50 opacity-50"
      }`}
    >
      <div className="p-6 md:p-8">
        <div className="flex items-start gap-4 md:gap-5">
          <div
            className={`text-3xl md:text-4xl font-bold shrink-0 w-10 transition-colors ${
              isComplete
                ? "text-accent-light"
                : isCurrent
                ? "text-accent-light"
                : "text-foreground/20"
            }`}
          >
            {isComplete ? (
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            ) : (
              stepNumber + 1
            )}
          </div>
          <div className="flex-1 min-w-0">
            {children}

            {isCurrent && !isLocked && (
              <button
                onClick={onComplete}
                className="mt-6 inline-flex items-center gap-2 bg-accent hover:bg-accent/80 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
              >
                {stepNumber === STEPS.length - 1 ? (
                  <>Done! View my app</>
                ) : (
                  <>
                    I&apos;ve done this — next step
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {isComplete && (
        <div className="px-8 pb-4">
          <span className="text-xs text-accent-light font-medium flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Complete
          </span>
        </div>
      )}
    </div>
  );
}

export default function GetStarted() {
  const [currentStep, setCurrentStep] = useState(0);
  const { data: session } = useSession();

  // Auto-advance step 0 if already signed in
  const effectiveStep =
    currentStep === 0 && session?.user ? Math.max(currentStep, 1) : currentStep;

  const advance = () => {
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  };

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Frozen header: hero + tracker */}
      <div className="sticky top-16 z-30 bg-background border-b border-border">
        <section className="max-w-3xl mx-auto px-4 pt-8 pb-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Get your app on{" "}
            <span className="text-accent-light">Viberplace</span>
          </h1>
          <p className="text-sm text-foreground/60 max-w-2xl mx-auto">
            Follow these 5 steps. The whole thing takes about 5 minutes.
          </p>
        </section>
        <div className="max-w-3xl mx-auto px-4 pb-4">
          <TrackerBar currentStep={effectiveStep} />
        </div>
      </div>

      {/* Steps */}
      <section className="max-w-3xl mx-auto px-4 pb-16">
        <div className="space-y-4">
          {/* Step 1: Sign Up */}
          <StepCard
            stepNumber={0}
            currentStep={effectiveStep}
            onComplete={advance}
          >
            <h2 className="text-xl font-semibold mb-3">
              Create your Viberplace account
            </h2>
            <p className="text-foreground/60 mb-4">
              One click. No passwords, no email verification, no hoops. Just sign
              in with GitHub or Google.
            </p>

            {session?.user ? (
              <div className="flex items-center gap-3 p-4 bg-accent/10 border border-accent/20 rounded-xl">
                {session.user.image && (
                  <img
                    src={session.user.image}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div>
                  <p className="font-medium text-sm">
                    Signed in as {session.user.name}
                  </p>
                  <p className="text-xs text-foreground/50">
                    You&apos;re good to go!
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => signIn("github")}
                  className="flex items-center gap-2 px-5 py-3 bg-[#24292e] hover:bg-[#24292e]/80 rounded-xl text-white text-sm font-medium transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  Sign in with GitHub
                </button>
                <span className="text-foreground/30 text-sm">or</span>
                <button
                  onClick={() => signIn("google")}
                  className="flex items-center gap-2 px-5 py-3 bg-white hover:bg-gray-100 rounded-xl text-gray-700 border border-gray-300 text-sm font-medium transition-colors"
                >
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
                </button>
              </div>
            )}
          </StepCard>

          {/* Step 2: Build */}
          <StepCard
            stepNumber={1}
            currentStep={effectiveStep}
            onComplete={advance}
          >
            <h2 className="text-xl font-semibold mb-3">
              Build something with AI
            </h2>
            <p className="text-foreground/60 mb-4">
              Use Claude Code, Cursor, Windsurf, or whatever AI coding tool gets
              you in the zone. Build a web app, a tool, a game — anything that
              runs in a browser.
            </p>

            <div className="bg-background rounded-xl border border-border p-4 font-mono text-sm">
              <div className="text-foreground/40 mb-2">
                # Example: start a new app with Claude Code
              </div>
              <div>
                <span className="text-accent-light">$</span> mkdir my-cool-app
                && cd my-cool-app
              </div>
              <div>
                <span className="text-accent-light">$</span> claude
              </div>
              <div className="text-foreground/60 mt-2 italic">
                &quot;Build me a recipe finder app using Next.js that lets users
                search by ingredients they have on hand&quot;
              </div>
            </div>

            <div className="mt-4 p-4 bg-accent/10 border border-accent/20 rounded-xl">
              <p className="text-sm text-foreground/70">
                <span className="font-semibold text-accent-light">
                  What counts as &quot;vibe-coded&quot;?
                </span>{" "}
                Anything you built primarily using AI assistance. It doesn&apos;t
                have to be perfect — if it works and does something useful (or
                fun), it belongs here.
              </p>
            </div>
          </StepCard>

          {/* Step 3: Deploy */}
          <StepCard
            stepNumber={2}
            currentStep={effectiveStep}
            onComplete={advance}
          >
            <h2 className="text-xl font-semibold mb-3">
              Deploy it so people can use it
            </h2>
            <p className="text-foreground/60 mb-4">
              Your app needs a live URL. Push to GitHub and deploy on Vercel —
              it&apos;s free and takes one command.
            </p>

            <div className="bg-background rounded-xl border border-border p-4 font-mono text-sm">
              <div className="text-foreground/40 mb-2"># Push to GitHub</div>
              <div>
                <span className="text-accent-light">$</span> git init && git add
                -A && git commit -m &quot;first commit&quot;
              </div>
              <div>
                <span className="text-accent-light">$</span> gh repo create
                my-cool-app --public --push --source .
              </div>
              <div className="mt-3 text-foreground/40"># Deploy to Vercel</div>
              <div>
                <span className="text-accent-light">$</span> npx vercel --prod
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 bg-background rounded-xl border border-border hover:border-accent/50 transition-colors text-sm"
              >
                <span className="font-medium">Vercel</span>
                <span className="text-foreground/40">— recommended</span>
              </a>
              <a
                href="https://netlify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 bg-background rounded-xl border border-border hover:border-foreground/30 transition-colors text-sm"
              >
                <span className="font-medium">Netlify</span>
                <span className="text-foreground/40">— also great</span>
              </a>
              <a
                href="https://pages.github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 bg-background rounded-xl border border-border hover:border-foreground/30 transition-colors text-sm"
              >
                <span className="font-medium">GitHub Pages</span>
                <span className="text-foreground/40">— static sites</span>
              </a>
            </div>

            <div className="mt-4 p-4 bg-accent/10 border border-accent/20 rounded-xl">
              <p className="text-sm text-foreground/70">
                <span className="font-semibold text-accent-light">
                  Never deployed before?
                </span>{" "}
                Just ask Claude Code: &quot;Help me deploy this to Vercel.&quot;
                It&apos;ll handle the whole thing for you.
              </p>
            </div>
          </StepCard>

          {/* Step 4: Submit */}
          <StepCard
            stepNumber={3}
            currentStep={effectiveStep}
            onComplete={advance}
          >
            <h2 className="text-xl font-semibold mb-3">
              Submit your app to Viberplace
            </h2>
            <p className="text-foreground/60 mb-4">
              Hit the button below, fill out a short form, and your app goes live
              immediately. No review process, no waiting.
            </p>

            <div className="bg-background rounded-xl border border-border p-5">
              <h3 className="text-sm font-semibold text-foreground/80 mb-3">
                What we&apos;ll ask you for:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: "App name", desc: "what you call it" },
                  { name: "Tagline", desc: "one sentence pitch" },
                  { name: "URL", desc: "where people can use it" },
                  { name: "Description", desc: "what it does & why" },
                  { name: "GitHub repo", desc: "optional — share the source" },
                  { name: "Tags", desc: "help people find it" },
                ].map((field) => (
                  <div key={field.name} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-light mt-2 shrink-0" />
                    <div>
                      <span className="font-medium text-sm">{field.name}</span>
                      <span className="text-foreground/40 text-sm">
                        {" "}
                        — {field.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex gap-3">
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 bg-accent/20 hover:bg-accent/30 text-accent-light px-5 py-3 rounded-xl font-medium text-sm transition-colors border border-accent/30"
              >
                Go to Submit Form →
              </Link>
            </div>

            <div className="mt-4 p-4 bg-accent/10 border border-accent/20 rounded-xl">
              <p className="text-sm text-foreground/70">
                <span className="font-semibold text-accent-light">
                  Pro tip:
                </span>{" "}
                A good screenshot makes a huge difference. Take one of your app
                in action and add it as the image URL.
              </p>
            </div>
          </StepCard>

          {/* Step 5: Live */}
          <StepCard
            stepNumber={4}
            currentStep={effectiveStep}
            onComplete={() => {
              // Could redirect to their profile or apps page
              window.location.href = "/apps";
            }}
          >
            <h2 className="text-xl font-semibold mb-3">
              You&apos;re live. Now share it.
            </h2>
            <p className="text-foreground/60 mb-4">
              Your app has its own page on Viberplace. Share the link everywhere
              — X, Discord, Reddit, your group chat. The more eyes, the better.
            </p>

            <div className="bg-background rounded-xl border border-border p-4 font-mono text-sm">
              <span className="text-foreground/40">Your app lives at:</span>
              <div className="mt-1 text-accent-light">
                viberplace.com/apps/your-app-name
              </div>
            </div>

            {/* Share buttons */}
            <div className="mt-6">
              <p className="text-sm font-semibold mb-3 text-foreground/80">
                Spread the word
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <a
                  href="https://twitter.com/intent/tweet?text=I%20just%20shipped%20my%20app%20on%20Viberplace%20%E2%80%94%20the%20marketplace%20for%20vibe-coded%20apps!&url=https://viberplace.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 bg-surface border border-border rounded-xl hover:border-foreground/30 transition-colors text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Post on X
                </a>
                <a
                  href="https://www.linkedin.com/sharing/share-offsite/?url=https://viberplace.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 bg-surface border border-border rounded-xl hover:border-foreground/30 transition-colors text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
                <a
                  href="https://reddit.com/submit?url=https://viberplace.com&title=I%20just%20shipped%20my%20app%20on%20Viberplace"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 bg-surface border border-border rounded-xl hover:border-foreground/30 transition-colors text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                  </svg>
                  Reddit
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("https://viberplace.com");
                  }}
                  className="flex items-center justify-center gap-2 p-3 bg-surface border border-border rounded-xl hover:border-foreground/30 transition-colors text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                  </svg>
                  Copy Link
                </button>
              </div>
            </div>

            <div className="mt-4 p-4 bg-accent/10 border border-accent/20 rounded-xl">
              <p className="text-sm text-foreground/70">
                <span className="font-semibold text-accent-light">
                  What&apos;s next?
                </span>{" "}
                Keep building. Keep shipping. Every app you submit builds your
                profile and your reputation in the community.
              </p>
            </div>
          </StepCard>
        </div>
      </section>

      {/* FAQ link */}
      <section className="max-w-3xl mx-auto px-4 py-12 text-center">
        <p className="text-foreground/50 text-sm">
          Have questions?{" "}
          <Link href="/faq" className="text-accent-light hover:text-white font-medium transition-colors">
            Check out the FAQ
          </Link>
        </p>
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

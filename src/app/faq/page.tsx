import Link from "next/link";

const FAQS = [
  {
    category: "Getting Started",
    items: [
      {
        q: "What is Viberplace?",
        a: "Viberplace is a marketplace where you can discover, share, and list apps built with AI coding tools. Think of it as an app store for vibe-coded projects.",
      },
      {
        q: "What does \"vibe-coded\" mean?",
        a: "Vibe coding means building software primarily with AI assistance — tools like Claude Code, Cursor, Windsurf, Copilot, or ChatGPT. You describe what you want, the AI writes the code, and you guide the process.",
      },
      {
        q: "Does my app have to be built with Claude Code?",
        a: "Nope. Any AI-assisted app is welcome — Claude Code, Cursor, Copilot, ChatGPT, whatever. If AI helped you build it, it's a vibe-coded app.",
      },
      {
        q: "Does it have to be finished?",
        a: "No! MVPs, prototypes, and works-in-progress are all welcome. Just make sure it actually runs and does something.",
      },
    ],
  },
  {
    category: "Submitting Apps",
    items: [
      {
        q: "How do I submit my app?",
        a: "Sign in with GitHub or Google, click \"Submit App\" in the nav bar, fill out a short form with your app's name, URL, and description, and you're live. The whole process takes about 2 minutes.",
      },
      {
        q: "Is there a review process?",
        a: "No. Your app goes live immediately after submission. We trust the community to build cool things.",
      },
      {
        q: "What info do I need to submit?",
        a: "App name, a one-sentence tagline, the live URL where people can use it, a description, and optionally a GitHub repo link and category tags.",
      },
      {
        q: "Can I edit my app after submitting?",
        a: "Yes. Visit your profile page to manage and update your listed apps.",
      },
    ],
  },
  {
    category: "Technical",
    items: [
      {
        q: "What tech stack should I use?",
        a: "Whatever you want! Next.js, React, Vue, Svelte, plain HTML/JS — if it has a URL, it works on Viberplace.",
      },
      {
        q: "Where should I deploy my app?",
        a: "Anywhere that gives you a public URL. We recommend Vercel (free, one command deploy), but Netlify, Railway, GitHub Pages, and others all work great.",
      },
      {
        q: "How do the live previews work?",
        a: "We embed your app in a sandboxed iframe so visitors can try it right on Viberplace. Your app needs to allow iframe embedding for this to work (most apps do by default).",
      },
      {
        q: "My app's preview isn't loading. What's wrong?",
        a: "Some apps set X-Frame-Options or Content-Security-Policy headers that block iframe embedding. Check your deployment settings and remove any frame-blocking headers.",
      },
    ],
  },
  {
    category: "Pricing & Monetization",
    items: [
      {
        q: "Is Viberplace free?",
        a: "Yes, completely free to list your app. Free to browse. Free to use.",
      },
      {
        q: "Can I charge for my app?",
        a: "Right now, Viberplace links out to your app — so you handle monetization however you want. Built-in payments coming soon.",
      },
      {
        q: "Will there be a paid tier?",
        a: "We're focused on building the community first. If we introduce paid features, listing and browsing will always remain free.",
      },
    ],
  },
  {
    category: "Community",
    items: [
      {
        q: "How do I get more visibility for my app?",
        a: "Share your Viberplace listing on X, LinkedIn, Reddit, and Discord. Apps with good screenshots and clear taglines tend to get the most attention.",
      },
      {
        q: "Can I see other apps by the same developer?",
        a: "Yes! Every developer has a profile page showing all their listed apps. Click on any developer's name or avatar to see their full portfolio.",
      },
      {
        q: "How do I report a broken or inappropriate app?",
        a: "Contact us and we'll review it. Community trust is everything — we take reports seriously.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="max-w-3xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-foreground/60 max-w-xl mx-auto">
            Everything you need to know about Viberplace. Can&apos;t find what
            you&apos;re looking for? Reach out and we&apos;ll help.
          </p>
        </div>

        {/* FAQ sections */}
        <div className="space-y-10">
          {FAQS.map((section) => (
            <div key={section.category}>
              <h2 className="text-lg font-bold text-accent-light mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-light" />
                {section.category}
              </h2>
              <div className="space-y-3">
                {section.items.map((faq) => (
                  <div
                    key={faq.q}
                    className="bg-surface border border-border rounded-xl p-6 hover:border-border/80 transition-colors"
                  >
                    <h3 className="font-semibold mb-2">{faq.q}</h3>
                    <p className="text-sm text-foreground/60 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-surface border border-border rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-2">Ready to get started?</h2>
          <p className="text-foreground/60 text-sm mb-6">
            Follow our step-by-step guide and have your app listed in 5 minutes.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/get-started"
              className="bg-accent hover:bg-accent/80 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/apps"
              className="border border-border hover:border-foreground/30 text-foreground px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Browse Apps
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-8">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-foreground/40">
          Viberplace — where vibe-coded apps find their people.
        </div>
      </footer>
    </div>
  );
}

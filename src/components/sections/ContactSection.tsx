import SectionHeader from "../shared/SectionHeader";

export default function ContactSection() {
  return (
    <section>
      <SectionHeader
        label="Let’s connect"
        title="Get in Touch"
        subtitle="Always open for discussions, collaborations, and ideas."
      />

      <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: copy */}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold">Contact me</h3>
            <p className="mt-2 text-slate-700">
              Whether it’s about scalable systems, new ideas, or potential
              collaborations — I’m always happy to connect and chat.
            </p>
            <p className="mt-2 text-slate-600 font-mono">{`{ Bengaluru, India }`}</p>
            <p className="mt-4 text-xs text-slate-500">
              For quick syncs or casual tech discussions, you can also use
              Calendly below.
            </p>
          </div>

          {/* Right: actions */}
          <div className="flex flex-col gap-3">
            <a
              href="mailto:meetupradyuman@gmail.com"
              className="rounded-xl bg-blue-600 text-white px-5 py-3 text-sm font-medium text-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Email meetupradyuman@gmail.com"
            >
              Email
            </a>

            <div className="grid sm:grid-cols-2 gap-3">
              <a
                href="/resume.pdf"
                className="rounded-xl border border-slate-300 text-slate-700 px-5 py-3 text-sm font-medium text-center hover:border-blue-300 hover:text-blue-700"
              >
                Resume
              </a>
              <a
                href="https://calendly.com/meetupradyuman/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-blue-200 text-blue-700 px-5 py-3 text-sm font-medium text-center hover:bg-blue-50"
              >
                Schedule a chat
              </a>
            </div>
            <div className="flex justify-center gap-5 text-sm mt-1">
              <a
                className="text-blue-700 hover:underline"
                href="https://github.com/legendary-acp"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                className="text-blue-700 hover:underline"
                href="https://www.linkedin.com/in/ppradyu"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="text-blue-700 hover:underline"
                href="hhttps://x.com/legendary_acp"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import SectionHeader from "../shared/SectionHeader";
import Button from "../shared/Button";

export default function ContactSection() {
  return (
    <section>
      <SectionHeader
        label="Let's connect"
        title="Get in Touch"
        subtitle="Always open for discussions, collaborations, and ideas."
      />

      <div className="rounded-3xl bg-surface border border-default p-8 shadow-xs">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold">Contact me</h3>
            <p className="mt-2 text-secondary">
              Whether it's about scalable systems, new ideas, or potential
              collaborations — I'm always happy to connect and chat.
            </p>
            <p className="mt-2 text-muted font-mono">{`{ Hyderabad, India }`}</p>
            <p className="mt-4 text-xs text-tertiary">
              For quick syncs or casual discussions, you can schedule a call
              anytime.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              href="/Resume.pdf"
              variant="primary"
              size="lg"
              className="w-full justify-center"
            >
              View Resume
            </Button>

            <div className="grid sm:grid-cols-2 gap-3">
              <Button
                href="mailto:meetupradyuman@gmail.com"
                variant="secondary"
                size="lg"
                className="justify-center"
                aria-label="Email meetupradyuman@gmail.com"
              >
                Email
              </Button>
              <Button
                href="https://calendly.com/meetupradyuman/30min"
                variant="ghost"
                size="lg"
                external
                className="justify-center"
              >
                Schedule a call
              </Button>
            </div>

            <div className="flex justify-center gap-5 text-sm mt-1">
              <a
                className="text-brand-hover hover:underline transition-colors"
                href="https://github.com/legendary-acp"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                className="text-brand-hover hover:underline transition-colors"
                href="https://www.linkedin.com/in/ppradyu"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="text-brand-hover hover:underline transition-colors"
                href="https://x.com/legendary_acp"
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

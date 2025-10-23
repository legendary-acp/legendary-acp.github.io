export default function PaperNotes() {
  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {PAPER_NOTES.map((note) => (
          <PaperNoteCard key={note.id} note={note} />
        ))}
      </div>

      {/* View all link */}
      <div className="text-center mt-12">
        <a
          href="#"
          className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
        >
          View all notes
          <span>→</span>
        </a>
      </div>
    </section>
  );
}

function PaperNoteCard({ note }) {
  return (
    <a
      href={note.link}
      className="group block border border-gray-200 rounded-lg overflow-hidden hover:border-gray-400 hover:shadow-md bg-white transition-all duration-300"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2 transition-colors">
              {note.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {note.date} • {note.readTime}
            </p>
          </div>
          <span className="inline-block bg-blue-100 text-blue-700 px-2.5 py-1 rounded text-xs font-semibold whitespace-nowrap flex-shrink-0">
            Note
          </span>
        </div>

        {/* Content */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {note.excerpt}
        </p>

        {/* Tags */}
        {note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {note.tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-block bg-gray-100 text-gray-700 px-2.5 py-1 rounded text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-end pt-3 border-t border-gray-100">
          <span className="text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors">
            Read notes →
          </span>
        </div>
      </div>
    </a>
  );
}

// Sample paper notes data (replace with your actual data)
const PAPER_NOTES = [
  {
    id: 1,
    title: "FlowHFT: Hazard notes that finally clicked",
    date: "10 Oct 2025",
    readTime: "6 min read",
    excerpt:
      "What 'probability path' really means in practice, plus a tiny Rust snippet I used to sanity-check it. Deep dive into the mathematical foundations of high-frequency trading hazard rates and their practical implications.",
    tags: ["hft", "systems", "rust"],
    link: "#",
  },
  {
    id: 2,
    title: "Misspecification in Inverse Reinforcement Learning",
    date: "28 Nov 2024",
    readTime: "15 min read",
    excerpt:
      "Exploring the fundamental challenges of inverse reinforcement learning when the true reward function is misspecified. Analysis of how small assumptions can cascade into major prediction errors.",
    tags: ["ml", "reinforcement-learning", "theory"],
    link: "#",
  },
  {
    id: 3,
    title: "Bitcoin: The Original Whitepaper Analysis",
    date: "04 Jul 2024",
    readTime: "20 min read",
    excerpt:
      "Breaking down Satoshi's whitepaper section by section and what makes the consensus mechanism so elegant. Understanding the breakthrough that solved the double-spending problem.",
    tags: ["blockchain", "cryptocurrency", "consensus"],
    link: "#",
  },
  {
    id: 4,
    title: "Cache Coherence Protocols: Deep Dive",
    date: "18 Jun 2024",
    readTime: "22 min read",
    excerpt:
      "Understanding MESI, MOESI, and other cache coherence protocols. How modern CPUs keep caches in sync across multiple cores and the performance implications.",
    tags: ["systems", "cpu", "performance"],
    link: "#",
  },
];

// Main Blog Page Component

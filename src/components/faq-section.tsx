const faqs = [
  // {
  //   question: "Can I download entire playlists?",
  //   answer:
  //     "Yes—paste the playlist URL and we'll queue every track automatically with throttled downloads to stay performant.",
  // },
  // {
  //   question: "Which qualities are supported?",
  //   answer:
  //     "You can export MP3 (320kbps, 256kbps, 192kbps), AAC (256kbps), or WAV (lossless). More profiles are coming soon.",
  // },
  {
    question: "Do I need to install anything?",
    answer:
      "No installation required. Everything runs right in your browser with secure connections to our conversion pipeline.",
  },
] as const;

export function FAQSection() {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-white sm:text-3xl">
        Frequently asked questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-2xl border border-white/10 bg-slate-900/60 p-5 transition hover:border-cyan-400/40"
          >
            <summary className="cursor-pointer text-sm font-semibold text-white marker:text-cyan-400">
              {faq.question}
            </summary>
            <p className="mt-3 text-sm text-slate-300">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

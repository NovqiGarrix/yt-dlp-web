const featureCards = [
  {
    title: "Crystal Clear Audio",
    description:
      "Extract MP3, AAC, or WAV with adaptive bitrate balancing clarity and size.",
    icon: "🎧",
  },
  // {
  //   title: "Smart Queueing",
  //   description:
  //     "Batch multiple links, track their progress, and download everything in one go.",
  //   icon: "⚡",
  // },
  // {
  //   title: "Cloud Ready",
  //   description:
  //     "Sync your library to Drive or Dropbox automatically after each conversion.",
  //   icon: "☁️",
  // },
] as const;

export function FeatureSection() {
  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {featureCards.map((feature) => (
        <div
          key={feature.title}
          className="group rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-black/30 transition hover:-translate-y-1 hover:border-cyan-400/40"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl">
            {feature.icon}
          </div>
          <h3 className="mt-4 text-lg font-semibold text-white">
            {feature.title}
          </h3>
          <p className="mt-2 text-sm text-slate-300">{feature.description}</p>
        </div>
      ))}
    </section>
  );
}

const workflowSteps = [
  {
    step: "01",
    title: "Paste the YouTube link",
    description:
      "Drop in any video or playlist URL. We'll fetch metadata instantly in the background.",
  },
  // {
  //   step: "02",
  //   title: "Choose your format",
  //   description:
  //     "Pick MP3, AAC, or WAV, then set bitrate and trimming options that fit your workflow.",
  // },
  {
    step: "02",
    title: "Download & enjoy",
    description:
      "Receive a share-ready audio file in seconds with smart naming already applied.",
  },
] as const;

export function WorkflowSection() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 sm:p-8">
      <h2 className="text-2xl font-semibold text-white sm:text-3xl">
        How it works
      </h2>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {workflowSteps.map((item) => (
          <div
            key={item.step}
            className="rounded-2xl border border-white/5 bg-slate-950/70 p-6 shadow-inner shadow-black/30"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-cyan-400">
              {item.step}
            </span>
            <h3 className="mt-3 text-lg font-semibold text-white">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-slate-300">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

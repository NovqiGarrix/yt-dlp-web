export function HeroSection() {
  return (
    <header className="flex flex-col items-center gap-6 text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
        Instant Audio
      </span>
      <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
        Download YouTube audio with elegance, speed, and perfect fidelity.
      </h1>
      <p className="max-w-2xl text-base text-slate-300 sm:text-lg">
        A beautifully crafted interface powered by yt-dlp under the hood. Built
        for creators, podcasters, and producers who expect more from their
        tools.
      </p>
    </header>
  );
}

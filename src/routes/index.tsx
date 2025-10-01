import { ConverterSection } from "@/components/converter-section";
import { FAQSection } from "@/components/faq-section";
import { FooterSection } from "@/components/footer-section";
import { HeroSection } from "@/components/hero-section";
import { WorkflowSection } from "@/components/workflow-section";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        title: "YouTubeMp3 | ytmp3.nvhub.my.id",
      },
    ],
  }),
});

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -right-32 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute top-48 -left-24 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
        <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-20 px-4 pb-24 pt-20 sm:px-8">
          <HeroSection />
          <ConverterSection />
          {/* <FeatureSection /> */}
          <WorkflowSection />
          <FAQSection />
          <FooterSection />
        </main>
      </div>
    </div>
  );
}

import { InputMediaDownloadOptions } from "@/components/input-media-download-options";
import { StatusBar } from "@/components/status-bar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yd - Youtube Downloader",
  description: "High-Performance Youtube Downloader",
};

export default function Page() {
  return (
    <div className="flex h-screen w-full bg-background text-foreground font-sans overflow-hidden">
      <main className="flex-1 flex flex-col relative z-10">
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-3xl space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground/90">
                Yd
              </h1>
              <p className="text-muted-foreground text-sm font-mono">
                High-Performance Youtube Downloader
              </p>
            </div>
            <InputMediaDownloadOptions />
          </div>
        </div>
        <StatusBar />
      </main>
    </div>
  );
}

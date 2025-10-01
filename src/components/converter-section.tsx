import {
  fetchDownloadAudioUrl,
  FetchError,
  fetchVideoInfo,
  ZodError,
} from "@/api/video";
import { formatViews } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { prettifyError, z } from "zod";

const youtubeUrlRule = z.url().refine(
  (url) => {
    // Basic check to see if the URL is a YouTube link
    return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(url);
  },
  {
    message: "Please enter a valid YouTube URL.",
  }
);

export function ConverterSection() {
  const [url, setUrl] = useState("");

  const {
    data: videoInfo,
    isLoading: isFetchingVideoInfo,
    error,
  } = useQuery({
    queryKey: ["fetchVideoInfo", url],
    queryFn: async () => {
      console.log("Fetching video info for URL:", url);
      const parsed = youtubeUrlRule.safeParse(url);
      if (!parsed.success) {
        throw new ZodError(prettifyError(parsed.error));
      }

      setUrl(url);

      // Do some fetching here
      const videoInfoResult = await fetchVideoInfo(url);
      if (videoInfoResult.isErr()) {
        throw videoInfoResult.error;
      }

      return videoInfoResult.value;
    },
    enabled: !!url,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!error) return;

    if (error instanceof ZodError || error instanceof FetchError) {
      toast.error(error.message);
    } else {
      toast.error("Failed to fetch video info. Please try again.");
    }

    console.error(error);
  }, [error]);

  const pasteClipboard = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (error) {
      toast.error("Failed to read clipboard. Please allow clipboard access.");
      console.error("Clipboard read error:", error);
    }
  }, []);

  const { mutate: downloadAudio, isPending: isDownloadingAudio } = useMutation({
    mutationKey: ["downloadAudio", url],
    mutationFn: async () => {
      const downloadUrlResult = await fetchDownloadAudioUrl(url);
      if (downloadUrlResult.isErr()) {
        throw downloadUrlResult.error;
      }

      return downloadUrlResult.value;
    },
    onSuccess: (downloadUrl: string) => {
      window.location.href = downloadUrl;
    },
    onError: (error) => {
      if (error instanceof ZodError || error instanceof FetchError) {
        toast.error(error.message);
      } else {
        toast.error("Failed to download audio. Please try again.");
      }

      console.error(error);
    },
  });

  return (
    <section className="grid w-full gap-10 lg:grid-cols-[2fr,1fr]">
      <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-2xl shadow-slate-950/50 backdrop-blur-xl sm:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            Convert a video
          </h2>
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
            Free forever
          </span>
        </div>

        <form className="mt-6 space-y-6">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-slate-400">
              YouTube link
            </span>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex-1 rounded-2xl border border-white/5 bg-slate-950/80 px-4 py-3 ring-offset-0 focus-within:border-cyan-400/40 focus-within:ring-2 focus-within:ring-cyan-400/20">
                <input
                  type="url"
                  name="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                  disabled
                  value={url}
                  required
                />
              </div>

              <button
                type="button"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isFetchingVideoInfo}
                onClick={pasteClipboard}
              >
                {isFetchingVideoInfo ? (
                  <>
                    <Loader2Icon className="size-5 mr-2 animate-spin text-white" />
                    Loading...
                  </>
                ) : (
                  "Paste"
                )}
              </button>
            </div>
          </label>

          {/* --- Audio format & trim options ---- */}
          {/* <div className="grid gap-4 sm:grid-cols-2">
            <label className="rounded-2xl border border-white/5 bg-slate-950/70 p-4 text-sm text-slate-200 shadow-inner shadow-black/20">
              <span className="mb-2 block text-xs uppercase tracking-widest text-slate-400">
                Format
              </span>
              <select className="w-full bg-transparent text-base font-semibold text-white outline-none">
                <option className="bg-slate-900">MP3 · 320kbps</option>
                <option className="bg-slate-900">MP3 · 192kbps</option>
                <option className="bg-slate-900">AAC · 256kbps</option>
                <option className="bg-slate-900">WAV · Lossless</option>
              </select>
            </label>

            <label className="rounded-2xl border border-white/5 bg-slate-950/70 p-4 text-sm text-slate-200 shadow-inner shadow-black/20">
              <span className="mb-2 block text-xs uppercase tracking-widest text-slate-400">
                Trim Audio (optional)
              </span>
              <div className="flex gap-3">
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="00:00"
                  className="w-full rounded-xl bg-slate-900/80 px-3 py-2 text-white outline-none placeholder:text-slate-500"
                />
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="03:30"
                  className="w-full rounded-xl bg-slate-900/80 px-3 py-2 text-white outline-none placeholder:text-slate-500"
                />
              </div>
            </label>
          </div> */}

          {videoInfo && (
            <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5 text-sm text-slate-200 shadow-inner shadow-black/20">
              <div className="grid gap-4 sm:grid-cols-[minmax(0,160px),1fr] sm:items-start">
                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-900 aspect-video sm:h-28 sm:aspect-auto">
                  <img
                    src={videoInfo.thumbnail}
                    alt={`Thumbnail for ${videoInfo.title}`}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold text-white line-clamp-2">
                      {videoInfo.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2">
                      Duration · {videoInfo.duration}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{videoInfo.channelTitle}</span>
                      <span>·</span>
                      <span>{formatViews(videoInfo.viewCount)} views</span>
                    </div>
                  </div>
                  <div className="flex w-full items-center text-xs text-slate-400">
                    <span className="truncate text-ellipsis" title={url}>
                      {url}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-3 sm:mt-5 sm:flex-row sm:items-center">
                <button
                  type="button"
                  disabled={isDownloadingAudio}
                  onClick={() => downloadAudio()}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 disabled:opacity-65 transition hover:scale-[1.02] sm:w-auto"
                >
                  {isDownloadingAudio ? (
                    <>
                      <Loader2Icon className="size-5 mr-2 animate-spin text-white" />
                      Downloading...
                    </>
                  ) : (
                    "Download audio"
                  )}
                </button>
              </div>
            </div>
          )}

          <p className="text-sm text-slate-400">
            We support any video length and <span className="italic">soon</span>{" "}
            add support for playlists. All conversions are handled securely with
            no data stored.
          </p>
        </form>
      </div>

      {/* <aside className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200 backdrop-blur-xl sm:p-8">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Designed for creators
          </h3>
          <p className="mt-2 text-slate-300">
            Queue downloads, add chapter-aware trimming, and sync straight to
            your DAW or podcast workflow.
          </p>
        </div>
        <ul className="space-y-3 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-emerald-400">●</span>
            Up to 3× faster than browser extensions thanks to multi-threaded
            processing.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-emerald-400">●</span>
            Automatic ID3 tagging with thumbnails, timestamps, and description
            notes.
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-emerald-400">●</span>
            Works perfectly on mobile, tablet, and desktop—no compromises.
          </li>
        </ul>
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Power users
          </p>
          <p className="mt-1 text-base font-medium text-white">
            Over 120K audio files processed last month.
          </p>
        </div>
      </aside> */}
    </section>
  );
}

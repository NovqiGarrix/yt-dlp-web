import api from "@/api";
import { MyException } from "@/exceptions/my-exception";
import { cn } from "@/lib/utils";
import { useOptionsStore, type Format } from "@/stores/options.store";
import { useMutation } from "@tanstack/react-query";
import { Download, FileAudio, FileVideo, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface DownloadOptionsProps {
  url: string;
}

export function DownloadOptions({ url }: DownloadOptionsProps) {
  const { format, setFormat } = useOptionsStore();

  const { mutate: onDownload, isPending } = useMutation({
    mutationFn: async () => {
      const resp = await api.downloadAudio(url, format);
      if (resp.isErr()) {
        throw resp.error;
      }
      return resp.value;
    },
    onSuccess: () => {
      toast.success("Download started");
    },
    onError: (error: MyException) => {
      toast.error(error.message);
    },
  });

  const formats: {
    value: Format;
    label: string;
    icon: React.ReactNode;
    disabled: boolean;
  }[] = [
    {
      value: "mp3",
      label: "MP3 Audio",
      icon: <FileAudio className="w-4 h-4" />,
      disabled: false,
    },
    {
      value: "mp4",
      label: "MP4 Video",
      icon: <FileVideo className="w-4 h-4" />,
      disabled: true,
    },
    {
      value: "wav",
      label: "WAV Audio",
      icon: <FileAudio className="w-4 h-4" />,
      disabled: true,
    },
  ];

  return (
    <div className="flex flex-col gap-4 w-full animate-in fade-in slide-in-from-bottom-5 duration-300 delay-150">
      <div className="grid grid-cols-3 gap-2">
        {formats.map((f) => (
          <button
            key={f.value}
            disabled={f.disabled}
            onClick={() => setFormat(f.value)}
            className={cn(
              "flex flex-col items-center justify-center gap-2 p-3 rounded-lg border transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed",
              format === f.value
                ? "bg-primary/10 border-primary text-primary"
                : "bg-card border-border hover:border-primary/50 text-muted-foreground hover:bg-accent/50",
            )}
          >
            {f.icon}
            <span className="text-xs font-semibold">{f.label}</span>
          </button>
        ))}
      </div>

      <button
        onClick={() => onDownload()}
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-lg font-medium transition-all shadow-lg shadow-primary/20 disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            <span>Download {format.toUpperCase()}</span>
          </>
        )}
      </button>
    </div>
  );
}

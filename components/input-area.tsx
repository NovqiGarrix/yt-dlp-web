"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, Loader2, Terminal } from "lucide-react";
import { HTMLAttributes, SubmitEvent, useState } from "react";

interface InputAreaProps extends HTMLAttributes<HTMLDivElement> {
  onUrlSubmit: (url: string) => void;
  disabled?: boolean;
  isSubmitting?: boolean;
}

function isValidUrl(url: string) {
  const pattern =
    /^(?:https?:\/\/)?(?:www\.|m\.)?(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|v\/|embed\/|shorts\/))([a-zA-Z0-9_-]{11})(?:[?&].*)?$/;
  return pattern.test(url);
}

export function InputArea({
  className,
  disabled,
  isSubmitting,
  onUrlSubmit,
  ...props
}: InputAreaProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string>();
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = isValidUrl(url);
    if (!isValid) {
      setError("Invalid URL");
      return;
    }

    setError(undefined);
    onUrlSubmit(url);
  };

  return (
    <div
      className={cn("w-full max-w-2xl mx-auto flex flex-col gap-2", className)}
      {...props}
    >
      <form
        onSubmit={handleSubmit}
        className={cn(
          "relative flex items-center bg-[#181818] border rounded-sm",
          isFocused
            ? "border-[#528bff] shadow-[0_0_0_1px_rgba(82,139,255,0.2)]"
            : "border-[#333333] hover:border-[#444444]",
        )}
      >
        <div className="pl-4 pr-2 text-[#528bff]">
          <Terminal className="size-5" />
        </div>

        <input
          type="text"
          value={url}
          onChange={(e) => {
            const value = e.target.value;
            setUrl(value);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Paste YouTube URL..."
          disabled={disabled}
          className="flex-1 bg-transparent border-none outline-none h-14 text-lg font-medium text-[#e1e1e1] placeholder:text-[#555555] font-sans"
        />

        <div className="flex items-center pr-2 gap-2">
          <button
            type="submit"
            disabled={!url.trim() || disabled}
            className="p-2 rounded-sm bg-[#2f2f2f] text-[#888888] hover:text-[#e1e1e1] hover:bg-[#333333] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isSubmitting ? (
              <Loader2 className="size-4" />
            ) : (
              <ArrowRight className="size-4" />
            )}
          </button>
        </div>
      </form>

      <div className="flex justify-between px-1 text-[11px] font-mono text-[#555555] min-h-[17px]">
        {error ? (
          <span className="text-[#ff5f56] font-bold">{`> Error: ${error}`}</span>
        ) : (
          <span>ready for input</span>
        )}
        <span>↵ to submit</span>
      </div>
    </div>
  );
}

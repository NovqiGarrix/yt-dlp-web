"use client";

import api from "@/api";
import { MyException } from "@/exceptions/my-exception";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { InputArea } from "./input-area";
import { MediaInfo } from "./media-info";
import { DownloadOptions } from "./download-options";

export function InputMediaDownloadOptions() {
  const {
    mutate: onUrlSubmit,
    isPending,
    data: info,
  } = useMutation({
    mutationFn: async (url: string) => {
      const resp = await api.getInfo(url);
      if (resp.isErr()) {
        throw resp.error;
      }

      return resp.value;
    },
    onError: (error: MyException) => {
      toast.error(error.message);
    },
  });

  return (
    <>
      <InputArea
        onUrlSubmit={onUrlSubmit}
        disabled={isPending}
        isSubmitting={isPending}
      />
      {info && (
        <>
          <MediaInfo info={info} />
          <DownloadOptions url={info.url} />
        </>
      )}
    </>
  );
}

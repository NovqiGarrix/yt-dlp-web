import { err, fromPromise, ok, ResultAsync } from "neverthrow";
import { prettifyError, z } from "zod";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL!;

export const videoSchema = z.object({
  id: z.string(),
  title: z.string(),
  duration: z.string(),
  channelTitle: z.string(),
  viewCount: z.string(),
  likeCount: z.string(),
  thumbnail: z.string(),
});

export type Video = z.infer<typeof videoSchema>;

export class FetchError extends Error {}

export class ZodError extends Error {}

export async function fetchVideoInfo(
  url: string
): Promise<ResultAsync<Video, Error>> {
  const respResult = await ResultAsync.fromPromise(
    fetch(`${API_BASE_URL}/info?url=${encodeURIComponent(url)}`).then((res) =>
      res.json()
    ),
    (_) => new FetchError("Network error while fetching video info")
  );

  if (respResult.isErr()) {
    return err(respResult.error);
  }

  const data = videoSchema.safeParse(respResult.value.data);
  if (!data.success) {
    return err(new ZodError(prettifyError(data.error)));
  }

  return ok(data.data);
}

const downloadAudioResponseSchema = z.object({
  url: z.url(),
});

export async function getDownloadUrl(
  url: string
): Promise<ResultAsync<string, Error>> {
  const respResult = await ResultAsync.fromPromise(
    fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    }).then((res) => res.json()),
    (_) => new FetchError("Network error while fetching download audio url")
  );

  if (respResult.isErr()) {
    return err(respResult.error);
  }

  const { error } = respResult.value;
  if (error) {
    return err(new FetchError(error));
  }

  const data = downloadAudioResponseSchema.safeParse(respResult.value);
  if (!data.success) {
    return err(new ZodError(prettifyError(data.error)));
  }

  return ok(data.data.url);
}

export async function fetchDownloadUrl(
  url: string
): Promise<ResultAsync<Blob, Error>> {
  const resp = await fetch(url);
  if (!resp.ok) {
    return err(
      new FetchError("Failed to fetch the download url", { cause: resp })
    );
  }

  const arrayBuffer = await fromPromise(
    resp.arrayBuffer(),
    (e) =>
      new FetchError("Failed to convert response to array buffer", { cause: e })
  );
  if (arrayBuffer.isErr()) {
    return err(arrayBuffer.error);
  }

  const contentType = resp.headers.get("content-type") || "audio/mp3";
  return ok(new Blob([arrayBuffer.value], { type: contentType }));
}

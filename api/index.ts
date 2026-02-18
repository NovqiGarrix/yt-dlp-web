import { MyException } from "@/exceptions/my-exception";
import { err, fromPromise, ok, Result } from "neverthrow";
import z from "zod";

export const API_URL = process.env.NEXT_PUBLIC_API_URL!;

function handleResponseError(e: unknown): MyException {
  console.error(e);
  return new MyException("Something went wrong");
}

function handleInvalidSchema(error: z.ZodError) {
  console.error("handleInvalidSchema", error);
  return new MyException("Server is sent invalid data");
}

const infoSchema = z.object({
  id: z.string(),
  title: z.string(),
  duration: z.string().optional(),
  channelTitle: z.string(),
  thumbnail: z.string().nullable(),
  url: z.string().url(),
});

export type InfoSchema = z.infer<typeof infoSchema>;

async function getInfo(url: string): Promise<Result<InfoSchema, MyException>> {
  const data = await fromPromise(
    fetch(`${API_URL}/info?url=${encodeURIComponent(url)}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    }).then(async (resp) => ({
      status: resp.status,
      json: await resp.json(),
    })),
    handleResponseError,
  );

  if (data.isErr()) {
    return err(data.error);
  }

  if (data.value.status !== 200) {
    return err(new MyException(data.value.json.error));
  }

  const parseResult = infoSchema.safeParse(data.value.json.data);
  if (!parseResult.success) {
    return err(handleInvalidSchema(parseResult.error));
  }

  return ok(parseResult.data);
}

const downloadSchema = z.object({
  url: z.string(),
});

function extractFilenameFromContentDisposition(
  contentDisposition?: string,
): string {
  if (!contentDisposition) {
    return "Music.mp3";
  }

  const encodedFilenameMatch = contentDisposition.match(
    /filename\*=UTF-8''([^;]+)/i,
  );
  if (encodedFilenameMatch?.[1]) {
    return decodeURIComponent(encodedFilenameMatch[1]);
  }

  const plainFilenameMatch = contentDisposition.match(/filename="?([^";]+)"?/i);
  if (plainFilenameMatch?.[1]) {
    return plainFilenameMatch[1];
  }

  return "Music.mp3";
}

async function downloadAudio(
  url: string,
  format: string,
): Promise<Result<void, MyException>> {
  const data = await fromPromise(
    fetch(API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, format }),
    }).then(async (resp) => ({
      status: resp.status,
      json: await resp.json(),
    })),
    handleResponseError,
  );

  if (data.isErr()) {
    return err(data.error);
  }

  if (data.value.status !== 200) {
    return err(
      new MyException(data.value.json.error || "Failed to download audio"),
    );
  }

  const parseResult = downloadSchema.safeParse(data.value.json);
  if (!parseResult.success) {
    return err(handleInvalidSchema(parseResult.error));
  }

  // Fetch the URL to get the buffer
  const fileResp = await fromPromise(
    fetch(parseResult.data.url),
    handleResponseError,
  );

  if (fileResp.isErr()) {
    return err(fileResp.error);
  }

  if (!fileResp.value.ok) {
    return err(new MyException("Failed to download audio"));
  }

  const buffer = Buffer.from(await fileResp.value.arrayBuffer());
  const blob = new Blob([buffer], { type: "audio/mpeg" });
  const fileUrl = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = extractFilenameFromContentDisposition(
    fileResp.value.headers.get("content-disposition")!,
  );
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(fileUrl);

  return ok();
}

async function checkHealth(): Promise<Result<string, MyException>> {
  const data = await fromPromise(
    fetch(`${API_URL}/`).then(async (resp) => ({
      status: resp.status,
      text: await resp.text(),
    })),
    handleResponseError,
  );

  if (data.isErr()) {
    return err(data.error);
  }

  if (data.value.status !== 200) {
    return err(new MyException("Health check failed"));
  }

  return ok(data.value.text);
}

function getDownloadUrl(filename: string): string {
  return `${API_URL}/downloads/${filename}`;
}

const api = {
  getInfo,
  checkHealth,
  downloadAudio,
  getDownloadUrl,
};

export default api;

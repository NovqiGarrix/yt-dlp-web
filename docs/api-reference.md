## API Reference

All responses are JSON unless explicitly returning a file stream. CORS is
enabled for `*` origins.

### GET /

Health check / simple greeting.

- Response: `200 text/plain` – `Hello, Hono!`

### POST /

Download audio and prepare a direct download link.

- Request
  - Headers: `Content-Type: application/json`
  - Body:
    ```json
    { "url": "https://www.youtube.com/watch?v=VIDEO_ID" }
    ```

- Success Response
  - Status: `200`
  - Body:
    ```json
    { "url": "http://localhost:9090/downloads/<uuid>.mp3" }
    ```
    Notes:
    - The actual path is computed from the request URL and server output path.
      It may include `/./` in the path depending on environment, which browsers
      will normalize.
    - Files are automatically cleaned up if older than 12 hours.

- Error Response
  - Status: `500`
  - Body:
    ```json
    { "error": "message", "type": "ErrorName" }
    ```
    Common causes:
    - `yt-dlp` not found or failed
    - Missing `GOOGLE_GENERATIVE_AI_API_KEY`
    - Network issues fetching video metadata or thumbnail

### GET /downloads/:filename

Stream/download a previously generated MP3 by its generated filename
(`<uuid>.mp3`).

- Path params
  - `filename`: e.g. `b109dd73-ef5a-462b-b788-10eade43242e.mp3`

- Success
  - Status: `200`
  - Headers:
    - `Content-Type: audio/mp3`
    - `Content-Disposition: attachment; filename="<title>"`
      - Uses the original video title from the DB (no extension added by the
        server).
  - Body: MP3 bytes

- Validation errors
  - Status: `400` if `filename` is invalid (must end with `.mp3` and not contain
    `..`).

### GET /info

Retrieve video information from YouTube without downloading.

- Query params
  - `url`: YouTube video URL (e.g. `https://www.youtube.com/watch?v=VIDEO_ID`
    and the shortened version `https://www.youtu.be/VIDEO_ID`)

- Success Response
  - Status: `200`
  - Body:
    ```json
    {
      "data": {
        "id": "VIDEO_ID",
        "title": "Video Title",
        "duration": "3:45",
        "channelTitle": "Channel Name",
        "viewCount": "1234567",
        "likeCount": "98765",
        "thumbnail": "https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg"
      }
    }
    ```
    Notes:
    - `duration` is formatted as `MM:SS` or `HH:MM:SS`
    - `thumbnail` returns the highest quality available (maxres > high > medium
      > default)
    - All statistics are strings as returned by the YouTube API

- Error Responses
  - Status: `400` – Missing or invalid YouTube URL
    ```json
    { "error": "Missing url parameter" }
    ```
    or
    ```json
    { "error": "Invalid YouTube URL" }
    ```
  - Status: `404` – Video not found
    ```json
    { "error": "Video not found" }
    ```

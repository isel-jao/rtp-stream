import logger from "./lib/logger";
import express from "express";
import { spawn } from "child_process";

const app = express();
const port = 3000;

app.get("/stream", (req, res) => {
  // Example RTP stream URL - replace with your actual stream URL
  const streamUrl = "rtmp://@233.50.201.255:1234";

  const ffmpeg = spawn("ffmpeg", [
    "-i",
    streamUrl, // Use the RTP stream URL as input
    "-c:v",
    "libx264", // Video codec
    "-c:a",
    "aac", // Audio codec
    "-f",
    "hls", // Output format HLS
    "-hls_time",
    "2", // Segment duration
    "-hls_list_size",
    "3", // Max number of playlist entries
    "stream.m3u8", // Output HLS playlist
  ]);

  ffmpeg.stderr.on("data", (data) => {
    logger.error(`stderr: ${data}`);
  });

  ffmpeg.on("close", (code) => {
    logger.info(`child process exited with code ${code}`);
  });

  res.send("Streaming started");
});

app.listen(port, () => {
  logger.info(`Server started at http://localhost:${port}`);
});

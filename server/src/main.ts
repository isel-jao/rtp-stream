import logger from "./lib/logger";
import express from "express";
import { spawn } from "child_process";
import cors from "cors";
const app = express();
const port = 3000;
app.use(cors());
app.use(express.static("public"));
const streamUrl = "rtmp://192.168.10.146:1935/live/stream";

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
  "public/stream.m3u8", // Output HLS playlist
]);

ffmpeg.stderr.on("data", (data) => {
  logger.error(`stderr: ${data}`);
});

ffmpeg.on("close", (code) => {
  logger.info(`child process exited with code ${code}`);
});

app.listen(port, () => {
  console.log("server is connectred");
});
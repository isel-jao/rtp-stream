import logger from "./lib/logger";
import express from "express";
import { spawn } from "child_process";

const app = express();
const port = 3000;

app.get("/stream", (req, res) => {
  const ffmpeg = spawn("ffmpeg", [
    "-i",
    "input.sdp", // Input SDP file for the RTP stream
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
    // console.log(`stderr: ${data}`);
    logger.error(`stderr: ${data}`);
  });

  ffmpeg.on("close", (code) => {
    // console.log(`child process exited with code ${code}`);
    logger.info(`child process exited with code ${code}`);
  });

  res.send("Streaming started");
});

app.listen(port, () => {
  //   console.log(`Server running at http://localhost:${port}`);
  logger.info(`Server running at http://localhost:${port}`);
});

import express from "express";
import cors from "cors";
import logger from "./lib/logger";
import { spawn } from "child_process";

const app = express();
const port = 3000;
app.use(cors());
app.use(express.static("public"));

app.listen(port, () => {
  console.log("server is connectred");
});

const streamUrl =
  "rtsp://154.144.255.113:554/user=admin_password=tlJwpbo6_channel=1_stream=0.sdp?real_stream";

// const ffmpeg = spawn("ffmpeg", [
//   "-i",
//   streamUrl, // Use the RTP stream URL as input
//   "-c:v",
//   "libx264", // Video codec
//   "-c:a",
//   "aac", // Audio codec
//   "-f",
//   "hls", // Output format HLS
//   "-hls_time",
//   "2", // Segment duration
//   "-hls_list_size",
//   "3", // Max number of playlist entries
//   "public/index.m3u8", // Output HLS playlist
// ]);

// const ffmpeg = spawn("ffmpeg", [
//   "-fflags",
//   "nobuffer",
//   "-loglevel",
//   "debug",
//   "-rtsp_transport",
//   "tcp",
//   "-i",
//   streamUrl,
//   "-vsync",
//   "0",
//   "-copyts",
//   "-vcodec",
//   "copy",
//   "-movflags",
//   "frag_keyframe+empty_moov",
//   "-an",
//   "-hls_flags",
//   "delete_segments+append_list",
//   "-f",
//   "hls",
//   "-hls_time",
//   "1",
//   "-hls_list_size",
//   "3",
//   "-hls_segment_type",
//   "mpegts",
//   "-hls_segment_filename",
//   "./public/%d.ts",
//   "./public/index.m3u8",
// ]);

// ffmpeg.stderr.on("data", (data) => {
//   logger.error(`stderr: ${data}`);
// });

// ffmpeg.on("close", (code) => {
//   logger.info(`child process exited with code ${code}`);
// });

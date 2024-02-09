import Hls from "hls.js";
import { useEffect, useRef } from "react";

const VideoPlayer = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        videoRef.current?.play();
      });
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = src;
      videoRef.current.addEventListener("loadedmetadata", function () {
        videoRef.current?.play();
      });
    }
  }, [src]);

  return <video ref={videoRef} controls />;
};
function App() {
  const path = "http://localhost:3000/path/to/your/hls/stream.m3u8";
  return (
    <main className="debug h-full">
      <VideoPlayer src={path} />
    </main>
  );
}

export default App;

import ReactPlayer from "react-player";

const VideoPlayer: React.FC = () => {
  return (
    <div className="player-wrapper">
      <ReactPlayer
        url="http://localhost:3000/index.m3u8"
        controls={true}
        playing={true}
        width="100%"
        height="100%"
      />
    </div>
  );
};

function App() {
  return (
    <main className="debug h-full">
      <VideoPlayer />
    </main>
  );
}

export default App;

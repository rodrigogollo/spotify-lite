import Volume from "../../components/Volume/Volume";
import Seek from "../../components/Seek/Seek";
import "./Player.css";
import ScrollingText from "../../components/ScrollingText/ScrollingText";
import Controller from "../../components/Controller/Controller";
import { useSpotifyStore } from "../../stores/spotifyStore";

const Player = () => {
  const currentTrack = useSpotifyStore((state) => state.currentTrack)

  return (
    <div className="player">
      <div className="track-container"> 
        <ScrollingText text={currentTrack} className={"current-track"} />
      </div>
      <div className="times">
        <Seek />
        <Controller />
        <Volume />
      </div>
    </div>
  )
}

export default Player;
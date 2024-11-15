import "./Volume.css";
import { SpotifyPlayerContext, useSpotifyPlayerContext } from "../../hooks/SpotifyPlayerContext";
import { CSSProperties, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeOff, faVolumeUp, faVolumeLow, faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";

const Volume = () => {
  const { player, volume, setVolume } = useSpotifyPlayerContext();
  const [bubblePosition, setBubblePosition] = useState(0);
  const [lastVolume, setLastVolume] = useState(volume);

  const handleVolumeChange = async (event) => {
    if (player) {
      try {
        let vol = event.target.value / 10;
        await player?.setVolume(vol / 10);
        setVolume(vol / 10);
        setLastVolume(vol/10);

        // Update bubble position based on slider value
        const newValue = event.target.value;
        const sliderWidth = event.target.offsetWidth;
        const min = event.target.min || 0;
        const max = event.target.max || 100;
        const percentage = (newValue - min) / (max - min);
        setBubblePosition(percentage * sliderWidth);
        
      } catch (err) {
        console.log("error changing volume", err);
      }
    }
  };

  const bubble: CSSProperties = {
    position: "absolute",
    top: "30px",
    left: `${355 + bubblePosition}px`,
    width: "30px",
    padding: "2px",
    backgroundColor: "white",
    borderRadius: "4px",
    textAlign: "center",
    pointerEvents: "none",
    transform: "translateX(-50%)",
    color: "var(--color-darkest)",
    fontSize: "10px"
  }

  const handleToggleVolume = async () => {
    if (volume != 0) {
      await player?.setVolume(0);
      setVolume(0);
    } else {
      await player?.setVolume(lastVolume);
      setVolume(lastVolume);
    }
  }

  return (
    <div className="volume">
      <FontAwesomeIcon icon={
        volume == 0 ? faVolumeXmark : 
        volume <= 0.5 ? faVolumeLow : 
        faVolumeHigh 
      } 
        onClick={handleToggleVolume}
        className="icon"
      />
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={volume * 100} 
        onChange={handleVolumeChange} 
        name="volume"
      />
      <div id="bubble" style={bubble}>{Math.floor(Number(volume * 100))}%</div>
    </div>
  )
}

export default Volume;

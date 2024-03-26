import cl from "./ZStoryButtons.module.css";
import nextSrc from "../icons/next.png";

export function StoryButtons({prevHistory, nextHistory}) {
  return (
    <div className={cl.container}>
      <button className={cl.btn} onClick={prevHistory}>
        <img src={nextSrc} alt="prev" style={{ transform: "scaleX(-1)" }} />
      </button>
      <button className={cl.btn} onClick={nextHistory}>
        <img src={nextSrc} alt="prev" />
      </button>
    </div>
  );
}

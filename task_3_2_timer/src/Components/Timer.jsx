import React from "react";
import css from "./Timer.module.scss";

const Timer = ({ isRunning, onToggle, onReset, time, renderCount }) => (
  <div className={css.container}>
    <div className={css.display}>
      <p className={css.time}>{time}</p>
      <p className={css.renders}>
        Number of component renders: {renderCount}
      </p>
      <div className={css.line}></div>
    </div>

    <div className={css.controls}>
      <button
        onClick={onToggle}
        className={`${css.button} ${isRunning ? css.pause : css.play}`}
      >
        {isRunning ? "❚❚ Pause" : "▶ Play"}
      </button>
      {time !== "00:00" && (
        <button onClick={onReset} className={`${css.button} ${css.reset}`}>
          Reset
        </button>
      )}
    </div>
  </div>
);

export default Timer;

import React from "react";
import useTimer from "../hooks/useTimer";
import Timer from "./Timer";
import css from "./App.module.scss";

const App = () => {
  const { time, isRunning, toggle, reset, renderCount } = useTimer();

  return (
    <div className={css.app}>
      <Timer
        isRunning={isRunning}
        onToggle={toggle}
        onReset={reset}
        time={time}
        renderCount={renderCount}
      />
    </div>
  );
};

export default App;

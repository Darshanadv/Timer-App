import React from "react";
import { useState, useEffect } from "react";

const Timer = () => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [running, setRunning] = useState(false);
  const [start, setStart] = useState(false);

  useEffect(() => {
    let timer;
    if (running) {
      setStart(true);
      timer = setInterval(() => {
        setSecond((prevSec) => (prevSec === 59 ? 0 : prevSec + 1));
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [running]);

  useEffect(() => {
    if (start && second === 0 && running) {
      setMinute((preMin) => {
        if (preMin === 59) {
          return 0;
        }
        return preMin + 1;
      });
    }
  }, [second, running]);

  useEffect(() => {
    if (minute === 59 && running) {
      setHour((preHr) => {
        return preHr + 1;
      });
    }
  }, [minute, running]);

  const startTimer = () => setRunning(true);
  const stopTimer = () => setRunning(false);
  const resetTimer = () => {
    stopTimer();
    setHour(0);
    setMinute(0);
    setSecond(0);
    setStart(false);
  };

  return (
    <>
      <div className="text-center mt-8 text-8xl">
        {String(hour).padStart(2, "0")} : {String(minute).padStart(2, "0")} :{" "}
        {String(second).padStart(2, "0")}
      </div>
      <div className="m-auto mt-10 grid grid-cols-3 gap-5 w-96">
        <button className="p-3 bg-black text-white" onClick={startTimer}>
          Start
        </button>
        <button className="p-3 bg-black text-white" onClick={stopTimer}>
          Stop
        </button>
        <button className="p-3 bg-black text-white" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </>
  );
};

export default Timer;

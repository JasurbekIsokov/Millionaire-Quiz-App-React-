import React, { useEffect, useState } from "react";

const Timer = ({ setStop, questionNumber }) => {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    // vaqt tugasa jarayon ham tugaydi
    if (timer === 0) return setStop(true);
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000); // secundomer
    return () => clearInterval(interval);
  }, [setStop, timer]);

  useEffect(() => {
    setTimer(30);
  }, [questionNumber]);

  return timer;
};

export default Timer;

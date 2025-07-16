import React, { useEffect, useState } from "react";
import "./Countdown.css";

function Countdown({ duration }) {
  const [time, setTime] = useState(duration);
  const [timeParts, setTimeParts] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime((prevTime) => prevTime - 1000);
    }, 1000);
    return () => clearTimeout(timer);
  }, [time]);

  useEffect(() => {
    const milliseconds = time;
    const totalSeconds = Math.floor(milliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const days = Math.floor(totalHours / 24);

    const seconds = totalSeconds % 60;
    const minutes = totalMinutes % 60;
    const hours = totalHours % 24;

    // Format mit führenden Nullen
    const format = (num) => String(num).padStart(2, "0");

    // Aufschlüsselung
    setTimeParts({
      days: format(days),
      hours: format(hours),
      minutes: format(minutes),
      seconds: format(seconds),
    });
  }, [time]);

  return (
    <div className="container">
      <div className="timer-container">
        <div className="digit-container">
          <span className="digit">{timeParts.days}</span>
        </div>
        <p>Tage</p>
      </div>
      <div className="timer-container">
        <div className="digit-container">
          <span className="digit">{timeParts.hours}</span>
        </div>
        <p>Stunden</p>
      </div>
      <div className="timer-container">
        <div className="digit-container">
          <span className="digit">{timeParts.minutes}</span>
        </div>
        <p>Minuten</p>
      </div>
      <div className="timer-container">
        <div className="digit-container">
          <span className="digit">{timeParts.seconds}</span>
        </div>
        <p>Sekunden</p>
      </div>
    </div>
  );
}

export default Countdown;

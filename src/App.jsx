import React, { useState, useEffect, useMemo } from "react";

// Hilfsfunktion: Formatiert Zahlen immer zweistellig (z.B. 09)
const formatValue = (value) => String(value).padStart(2, "0");

// --- Custom Hook für die Countdown-Logik  ---
const useCountdown = (duration) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1000 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  return useMemo(() => {
    if (timeLeft <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    const totalSeconds = Math.floor(timeLeft / 1000);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;
    return { days, hours, minutes, seconds };
  }, [timeLeft]);
};

// --- FlipUnit Komponente (React-Logik ist unverändert) ---
const FlipUnit = ({ unit, value }) => {
  const [prevValue, setPrevValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (value !== prevValue) {
      setIsFlipping(true);
      const timer = setTimeout(() => {
        setPrevValue(value);
        setIsFlipping(false);
      }, 500); // Muss mit der CSS-Animationsdauer übereinstimmen

      return () => clearTimeout(timer);
    }
  }, [value, prevValue]);

  return (
    <div className="flip-unit">
      <div className="flip-card-container">
        {/* Statischer Hintergrund: Oben zeigt den neuen Wert, unten den alten. */}
        <div className="static-card top">{formatValue(value)}</div>
        <div className="static-card bottom">{formatValue(prevValue)}</div>

        {/* Die animierte Klappe */}
        <div className={`flip-card ${isFlipping ? "flipping" : ""}`}>
          {/* Vorderseite der Klappe: Zeigt den alten Wert */}
          <div className="card-face top">{formatValue(prevValue)}</div>
          {/* Rückseite der Klappe: Zeigt den neuen Wert */}
          <div className="card-face bottom">{formatValue(value)}</div>
        </div>
      </div>
      <span className="unit-label">{unit}</span>
    </div>
  );
};

// --- Countdown Komponente (unverändert) ---
const Countdown = ({ duration }) => {
  const { days, hours, minutes, seconds } = useCountdown(duration);

  return (
    <div className="countdown-container">
      <FlipUnit unit="Tage" value={days} />
      <FlipUnit unit="Stunden" value={hours} />
      <FlipUnit unit="Minuten" value={minutes} />
      <FlipUnit unit="Sekunden" value={seconds} />
    </div>
  );
};

// --- Haupt-App Komponente ---
export default function App() {
  // Dauer für den Countdown.
  // Beispiel: 14 Tage, 8 Stunden, 23 Minuten, 5 Sekunden in Millisekunden
  const countdownDuration =
    14 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000 + 23 * 60 * 1000 + 5 * 1000;

  return (
    <>
      <div className="app-container">
        <header className="header-container">
          <h1 className="title">We're launching soon</h1>
        </header>
        <main className="content">
          <Countdown duration={countdownDuration} />
        </main>
        <footer className="footer">
          <span>&copy; 2025 made with ♥️ </span>
        </footer>
      </div>
    </>
  );
}

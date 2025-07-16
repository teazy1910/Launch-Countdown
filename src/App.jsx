import { useState } from "react";
import Countdown from "./components/Countdown/Countdown.jsx";
import "./App.css";

function App() {
  return (
    <>
      <header className="header-container">
        <h1 className="title">We're launching soon</h1>
      </header>
      <main className="content">
        <Countdown duration={3 * 24 * 60 * 60 * 1000} />
      </main>
      <footer className="footer">Footer</footer>
    </>
  );
}

export default App;

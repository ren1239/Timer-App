import React, { useState } from "react"; // Import useState from "react"
import "./App.css";
import Timer from "./Component/Timer.js"; // Check the path to Timer.js
import "tachyons";

function App() {
  const [keepGoing, setKeepGoing] = useState(false);

  const handleTimerEnd = () => {
    setKeepGoing(true);
  };
  const handleReset = () => {
    setKeepGoing(false);
  };

  return (
    <header className="App-header">
      <Timer onTimerEnd={handleTimerEnd} onReset={handleReset} />{" "}
      {/* Ensure onTimerEnd is passed as a prop */}
      <p>{keepGoing ? "Keep it Up!!!" : "Learn for only 5 Minutes"}</p>
    </header>
  );
}

export default App;

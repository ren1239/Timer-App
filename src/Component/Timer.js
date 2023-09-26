import React, { useEffect, useState, useRef } from "react";

function Timer({ onTimerEnd, onReset }) {
  // Receive onTimerEnd and onReset as props

  // 1.1 Declare timer and timerOn state variables

  const [timer, setTimer] = useState(300); // Initial timer value (5 minutes)
  const [timerOn, setTimerOn] = useState(false); // Timer on/off state
  const audioRef = useRef(); // Create a reference to the audio element

  //  2.1 Create a useEffect hook that runs when the timerOn state variable changes (listening to timerOn, onTimerEnd, and timer)
  useEffect(
    () => {
      // 2.1.1 Declare a countdown variable outside of the conditional statement
      let countdown;

      // 2.2 Check if the timer is on
      if (timerOn) {
        // 2.3 If the timer is on, create a setInterval that decreases the timer every 1000 ms (1 second)
        countdown = setInterval(() => {
          // 2.4 Set the timer value to the previous value minus 1 second.
          // 2.5 if the timer reaches 0, clear the interval and set the timerOn state variable to false & play the audio
          setTimer((prev) => {
            if (prev <= 1) {
              clearInterval(countdown);
              setTimerOn(false);
              audioRef.current.play();
            }
            // 2.6 If the timer is not 0, return the previous value minus 1 second
            return prev - 1;
          });
        }, 1000);
      } else {
        // 2.7 If the timer is not on, clear the interval
        clearInterval(countdown);
      }

      // Notify the parent component when the timer ends
      if (timer === 0) {
        onTimerEnd(); // Call the onTimerEnd function passed as a prop
      }

      // 2.8 Return a clean up function that clears the interval when the component unmounts
      return () => clearInterval(countdown);
    },
    // 2.9 Add the dependencies to the useEffect hook
    [timerOn, onTimerEnd, timer]
  );

  // 3.1 Create a function to format the time in MM:SS format
  const formatTime = (seconds) => {
    if (seconds < 0) {
      return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // 4.1 Create functions to toggle the timer and reset the timer
  const toggleTimer = () => {
    setTimerOn(!timerOn);
  };

  // 5.1 Create a function to reset the timer
  const resetTimer = () => {
    setTimer(300); // Reset timer to 5 minutes (300 seconds)
    setTimerOn(false);
    onReset();
  };

  // 6.1 Render the timer component
  return (
    <div className="tc">
      <h1>The 5 Minute Timer</h1>
      <div className="timer tc">{formatTime(timer)}</div>
      <div className="flex items-center justify-center ph3">
        <button
          className="f6 link dim br-pill ph3 pv2 mb2 dib white bg-black"
          onClick={toggleTimer}
        >
          {timerOn ? "Pause" : "Start"}
        </button>
        <button
          className="f6 link dim br-pill ph3 pv2 mb2 dib white bg-black"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
      <audio ref={audioRef} src="/Bell.mp3" />
    </div>
  );
}

export default Timer;

"use client";
import { useEffect, useState } from "react";

const releaseDate = new Date(process.env.COUNTDOWN || "2025-01-17T00:00:00Z");

interface TimeLeft {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
};

function calculateTimeLeft() {
  const difference = +releaseDate - +new Date();
  let timeLeft: TimeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
}

export default function Home() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="bg-black text-white font-mono flex justify-center items-center flex-col h-screen text-center overflow-hidden p-4"
      style={{ 
      backgroundImage: 'url(/data.gif)', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundColor: 'rgba(0, 0, 0, 0.7)', 
      backgroundBlendMode: 'overlay' 
      }}
    >
      <div id="container" className="animate-fadeIn">
      <h1 className="text-2xl md:text-3xl tracking-widest uppercase mb-5 opacity-90">The Whispers Begin In</h1>
      <div id="countdown" className="text-3xl md:text-4xl font-bold tracking-wide text-teal-400">
        {timeLeft ? (
        `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`
        ) : (
        "It has begun."
        )}
      </div>
      <div className="info-section mt-10 text-base md:text-lg opacity-80">
        <p>Follow the echoes: <a href="https://x.com/echo_archive" target="_blank" className="text-teal-400 hover:opacity-70 transition-opacity"> @echo_archive</a></p>
        <div className="contract mt-2 text-sm md:text-base tracking-wide break-words">
        <p>Contract Address:</p>
        <p className=" text-xs md:text-base">-</p>
        </div>
      </div>
      <div id="footer" className="mt-5 text-sm md:text-base opacity-60 animate-flicker">Echo Chronicles // {new Date().getFullYear()}</div>
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";

export default function Loader() {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsDone(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="loader" className={isDone ? "done" : ""}>
      <div className="l-name">KAMALI V</div>
      <div className="l-spin">
        <div className="l-ring"></div>
        <div className="l-ring"></div>
        <div className="l-ring"></div>
      </div>
      <div className="l-bar">
        <div className="l-fill"></div>
      </div>
      <div className="l-sub">Initializing...</div>
    </div>
  );
}

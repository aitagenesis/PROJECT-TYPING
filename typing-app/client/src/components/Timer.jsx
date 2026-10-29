import { useEffect, useState } from "react";

export default function Timer({ seconds = 60, onComplete }) {
  const [remaining, setRemaining] = useState(seconds);
  useEffect(() => setRemaining(seconds), [seconds]);
  useEffect(() => {
    if (remaining <= 0) { onComplete?.(); return undefined; }
    const timerId = window.setTimeout(() => setRemaining((value) => value - 1), 1000);
    return () => window.clearTimeout(timerId);
  }, [remaining, onComplete]);
  return <span aria-live="polite">{Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, "0")}</span>;
}
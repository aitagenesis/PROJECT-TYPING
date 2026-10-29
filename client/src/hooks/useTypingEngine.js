import { useMemo, useState } from "react";
import { calculateWPM } from "../utils/calculateWPM.js";
import { calculateAccuracy } from "../utils/calculateAccuracy.js";

export function useTypingEngine(targetText) {
  const [typedText, setTypedText] = useState("");
  const [startedAt, setStartedAt] = useState(Date.now());
  const elapsedSeconds = Math.max(1, Math.floor((Date.now() - startedAt) / 1000));
  const wpm = useMemo(() => calculateWPM(typedText, elapsedSeconds), [typedText, elapsedSeconds]);
  const accuracy = useMemo(() => calculateAccuracy(targetText, typedText), [targetText, typedText]);
  function updateTypedText(value) { if (!typedText && value) setStartedAt(Date.now()); setTypedText(value); }
  function reset() { setTypedText(""); setStartedAt(Date.now()); }
  return { typedText, setTypedText: updateTypedText, wpm, accuracy, elapsedSeconds, reset };
}
// Standard net typing speed: five typed characters count as one word.
export function calculateWPM(typedText = "", elapsedSeconds = 0) {
  const minutes = Number(elapsedSeconds) / 60;
  if (!Number.isFinite(minutes) || minutes <= 0) return 0;
  return Math.max(0, Math.round((String(typedText).length / 5) / minutes));
}
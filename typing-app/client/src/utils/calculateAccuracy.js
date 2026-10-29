export function calculateAccuracy(targetText = "", typedText = "") {
  const target = String(targetText);
  const typed = String(typedText);
  if (typed.length === 0) return 100;
  let correct = 0;
  for (let index = 0; index < typed.length; index += 1) {
    if (typed[index] === target[index]) correct += 1;
  }
  return Math.round((correct / typed.length) * 100);
}
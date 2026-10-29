export function useVisualEffects(mode = "normal") {
  const knownModes = new Set(["dimmed", "moving", "block"]);
  return knownModes.has(mode) ? `mode-${mode}` : "";
}
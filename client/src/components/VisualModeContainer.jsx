import { useVisualEffects } from "../hooks/useVisualEffects.js";

export default function VisualModeContainer({ mode = "normal", children }) {
  const className = useVisualEffects(mode);
  return <div className={className}>{children}</div>;
}
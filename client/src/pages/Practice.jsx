import { useState } from "react";
import SpeedMeter from "../components/SpeedMeter.jsx";
import VisualModeContainer from "../components/VisualModeContainer.jsx";
import { useTypingEngine } from "../hooks/useTypingEngine.js";

const sampleText = "Good typing comes from steady practice, relaxed hands, and careful attention to each word.";

export default function Practice() {
  const [mode, setMode] = useState("normal");
  const { typedText, setTypedText, wpm, accuracy, reset, elapsedSeconds } = useTypingEngine(sampleText);
  return <section className="stack"><h1>Typing practice</h1>
    <label>Visual mode{" "}<select value={mode} onChange={(e) => setMode(e.target.value)}>
      <option value="normal">Normal</option><option value="dimmed">Dimmed</option><option value="moving">Moving</option><option value="block">Block</option>
    </select></label>
    <SpeedMeter wpm={wpm} accuracy={accuracy} />
    <article className="panel stack">
      <VisualModeContainer mode={mode}><p>{sampleText}</p></VisualModeContainer>
      <label htmlFor="typing-input">Type the passage here</label>
      <textarea id="typing-input" rows="5" value={typedText} onChange={(e) => setTypedText(e.target.value)} placeholder="Start typing…" />
      <p>Elapsed time: {elapsedSeconds}s</p>
      <button className="btn secondary" onClick={reset}>Restart test</button>
    </article>
  </section>;
}
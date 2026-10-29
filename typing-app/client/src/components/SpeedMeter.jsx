export default function SpeedMeter({ wpm = 0, accuracy = 100 }) {
  return (
    <div className="metric-grid" aria-live="polite">
      <div className="card"><small>Speed</small><h2>{Math.round(wpm)} WPM</h2></div>
      <div className="card"><small>Accuracy</small><h2>{Math.round(accuracy)}%</h2></div>
    </div>
  );
}
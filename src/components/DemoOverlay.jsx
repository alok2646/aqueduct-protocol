import React from 'react';
import { ChevronRight, Pause, Play, RotateCcw, SkipForward } from 'lucide-react';

const steps = ['City', 'Flow', 'Sensors', 'Sampling', 'Gemini', 'Filtration', 'Results', 'Learning', 'Future'];

export default function DemoOverlay({ step, running, paused, onStart, onPause, onRestart, onSkip }) {
  return <section className={`demo-console ${running ? 'demo-live' : ''}`}>
    <div className="demo-console-head">
      <div><div className="panel-kicker">COMPETITION DEMO MODE</div><h2>{running ? `STEP ${String(step + 1).padStart(2, '0')} · ${steps[step].toUpperCase()}` : 'Guided system walkthrough'}</h2></div>
      <div className="demo-status"><span className={running && !paused ? 'live-dot' : 'paused-dot'} />{running ? (paused ? 'PAUSED' : 'LIVE') : 'READY'}</div>
    </div>
    <div className="demo-stepper">{steps.map((label, index) => <div className={`demo-step ${index === step && running ? 'current' : ''} ${index < step && running ? 'visited' : ''}`} key={label}><span>{String(index + 1).padStart(2, '0')}</span><small>{label}</small></div>)}</div>
    <div className="demo-actions">
      {!running ? <button className="demo-start" onClick={onStart}><Play size={15} fill="currentColor" /> START DEMO <ChevronRight size={16} /></button> : <button onClick={onPause}>{paused ? <Play size={14} fill="currentColor" /> : <Pause size={14} />} {paused ? 'RESUME' : 'PAUSE DEMO'}</button>}
      {running && <button onClick={onSkip}><SkipForward size={14} /> SKIP STEP</button>}
      <button onClick={onRestart}><RotateCcw size={14} /> {running ? 'RESTART' : 'RESET DEMO'}</button>
    </div>
  </section>;
}
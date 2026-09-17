import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Activity, Bot, ChevronRight, Droplets, Eye, FlaskConical, Gauge, Layers3, Play, RotateCcw, ShieldCheck, StopCircle, Sun, Waves, Zap } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import City from './components/City';
import CityDetails from './components/CityDetails';
import Dashboard from './components/Dashboard';
import DemoOverlay from './components/DemoOverlay';
import GeminiAssistant from './components/GeminiAssistant';
import LearningMission from './components/LearningMission';
import { FiltrationSystem, SamplingChamber, SensorStation } from './components/Infrastructure';
import StudentPlatform from './components/StudentPlatform';
import { WaterChannel } from './components/WaterChannel';

const initialReadings = { pH: '6.8', turbidity: '61', temperature: '27.0', conductivity: '420', oxygen: '6.2' };
const demoSteps = [
  { title: 'Future Urban Learning Corridor', body: 'A protected civic learning sandbox connects the city, water channel, sensors and classroom.' },
  { title: 'Urban water infrastructure is continuously monitored.', body: 'Animated flow makes the hidden movement of the city visible.' },
  { title: 'SIMULATED DEMO DATA · ATTENTION', body: 'Turbidity rises to 68 NTU. Students investigate the signal instead of entering the channel.' },
  { title: 'Controlled sampling protects learners.', body: 'Students do not directly contact untreated water. Learning occurs through an isolated controlled side-stream.' },
  { title: 'MOCK AI / DEMO MODE', body: 'Gemini Learning Assistant explains the simulated turbidity reading.' },
  { title: 'Multi-stage filtration', body: 'Screening · Sedimentation · Bio-filtration · Final filtration' },
  { title: 'SIMULATED DEMONSTRATION VALUES', body: 'BEFORE 68 NTU  →  AFTER 26 NTU' },
  { title: 'MISSION COMPLETE', body: 'Water Quality · Sensors · Data Analysis · Filtration · Urban Environmental Systems' },
  { title: 'AQUEDUCT PROTOCOL', body: 'Turning urban infrastructure into safe, data-driven learning sandboxes.' },
];

function CameraRig({ cameraTarget }) {
  const controlsRef = useRef();
  const destination = useMemo(() => ({ position: [...cameraTarget.position], target: [...cameraTarget.target] }), [cameraTarget]);
  useFrame(({ camera }, delta) => {
    const easing = 1 - Math.pow(0.001, delta);
    camera.position.x += (destination.position[0] - camera.position.x) * easing;
    camera.position.y += (destination.position[1] - camera.position.y) * easing;
    camera.position.z += (destination.position[2] - camera.position.z) * easing;
    if (controlsRef.current) {
      controlsRef.current.target.x += (destination.target[0] - controlsRef.current.target.x) * easing;
      controlsRef.current.target.y += (destination.target[1] - controlsRef.current.target.y) * easing;
      controlsRef.current.target.z += (destination.target[2] - controlsRef.current.target.z) * easing;
      controlsRef.current.update();
    }
  });
  return <OrbitControls ref={controlsRef} makeDefault target={cameraTarget.target} minDistance={7} maxDistance={42} maxPolarAngle={Math.PI / 2.08} enableDamping />;
}

export default function App() {
  const [flowing, setFlowing] = useState(true);
  const [readings, setReadings] = useState(initialReadings);
  const [sensorState, setSensorState] = useState('ONLINE');
  const [testState, setTestState] = useState('READY');
  const [filtrationState, setFiltrationState] = useState('IDLE');
  const [filterProgress, setFilterProgress] = useState(0);
  const [filterBefore, setFilterBefore] = useState('61');
  const [filterAfter, setFilterAfter] = useState('24');
  const [focus, setFocus] = useState('city');
  const [info, setInfo] = useState(null);
  const [demoStep, setDemoStep] = useState(0);
  const [demoRunning, setDemoRunning] = useState(false);
  const [demoPaused, setDemoPaused] = useState(false);
  const [demoPrompt, setDemoPrompt] = useState('');
  const [demoMissionComplete, setDemoMissionComplete] = useState(false);
  const [missionResetToken, setMissionResetToken] = useState(0);
  const demoTimerRef = useRef(null);
  const filtrationTimerRef = useRef(null);

  const focusTargets = useMemo(() => ({
    city: { position: [15, 12, 19], target: [0, 1, 0] },
    sensor: { position: [9, 5, 7], target: [2, 1.7, 0] },
    filtration: { position: [-10, 5, 4], target: [-4, 1.5, 0] },
    students: { position: [5, 4, 12], target: [4, 2.4, 4] },
  }), []);

  useEffect(() => () => {
    window.clearTimeout(demoTimerRef.current);
    window.clearInterval(filtrationTimerRef.current);
  }, []);

  useEffect(() => {
    if (!demoRunning || demoPaused) return undefined;
    const actions = [
      () => { setFocus('city'); setFlowing(false); },
      () => setFlowing(true),
      () => { setFocus('sensor'); setReadings({ ...initialReadings, turbidity: '68' }); setTestState('COMPLETE'); setSensorState('ONLINE'); },
      () => setFocus('students'),
      () => setDemoPrompt('What does high turbidity mean?'),
      () => { setFocus('filtration'); runFiltration(); },
      () => { setFilterBefore('68'); setFilterAfter('26'); setFilterProgress(100); setFiltrationState('COMPLETE'); setReadings((current) => ({ ...current, turbidity: '26' })); },
      () => setDemoMissionComplete(true),
      () => { setFocus('city'); setFlowing(true); },
    ];
    actions[demoStep]?.();
    const duration = [3200, 3200, 4300, 4000, 4300, 5000, 3500, 3600, 6000][demoStep];
    if (demoStep < demoSteps.length - 1) demoTimerRef.current = window.setTimeout(() => setDemoStep((current) => current + 1), duration);
    else demoTimerRef.current = window.setTimeout(() => setDemoRunning(false), duration);
    return () => window.clearTimeout(demoTimerRef.current);
  }, [demoRunning, demoPaused, demoStep]);

  function runTest() {
    if (testState !== 'READY') return;
    setTestState('COLLECTING');
    setSensorState('SAMPLING');
    window.setTimeout(() => setTestState('ANALYZING'), 900);
    window.setTimeout(() => {
      const next = {
        pH: (6.6 + Math.random() * 0.5).toFixed(1),
        turbidity: String(Math.floor(55 + Math.random() * 18)),
        temperature: (26.2 + Math.random() * 1.8).toFixed(1),
        conductivity: String(Math.floor(390 + Math.random() * 70)),
        oxygen: (5.8 + Math.random() * 0.8).toFixed(1),
      };
      setReadings(next);
      setTestState('COMPLETE');
      setSensorState('ONLINE');
    }, 2300);
  }

  function runFiltration() {
    if (filtrationState === 'RUNNING') return;
    window.clearInterval(filtrationTimerRef.current);
    setFiltrationState('RUNNING');
    setFilterProgress(0);
    setFilterBefore(readings.turbidity);
    let progress = 0;
    filtrationTimerRef.current = window.setInterval(() => {
      progress += 25;
      setFilterProgress(progress);
      if (progress >= 100) {
        window.clearInterval(filtrationTimerRef.current);
        setFiltrationState('COMPLETE');
        const after = Math.max(18, Math.floor(Number(readings.turbidity) * 0.39));
        setFilterAfter(String(after));
        setReadings((current) => ({ ...current, turbidity: String(after) }));
      }
    }, 650);
  }

  function resetSystem({ resetDemo = true } = {}) {
    window.clearTimeout(demoTimerRef.current);
    window.clearInterval(filtrationTimerRef.current);
    setFlowing(false);
    setReadings(initialReadings);
    setTestState('READY');
    setSensorState('ONLINE');
    setFiltrationState('IDLE');
    setFilterProgress(0);
    setFilterBefore('61');
    setFilterAfter('24');
    setFocus('city');
    setInfo(null);
    setDemoPrompt('');
    setDemoMissionComplete(false);
    setMissionResetToken((current) => current + 1);
    if (resetDemo) {
      setDemoRunning(false);
      setDemoPaused(false);
      setDemoStep(0);
    }
  }

  function startDemo() {
    resetSystem({ resetDemo: false });
    setDemoStep(0);
    setDemoPaused(false);
    setDemoRunning(true);
  }

  function restartDemo() { resetSystem(); startDemo(); }

  function skipDemoStep() {
    window.clearTimeout(demoTimerRef.current);
    setDemoStep((current) => Math.min(current + 1, demoSteps.length - 1));
  }

  return (
    <main className="app-shell">
      <section className="viewport">
        <Canvas shadows dpr={[1, 1.6]} onPointerMissed={() => setInfo(null)}>
          <PerspectiveCamera makeDefault position={focusTargets[focus].position} fov={42} />
          <color attach="background" args={['#081114']} />
          <fog attach="fog" args={['#081114', 28, 58]} />
          <ambientLight intensity={1.25} />
          <directionalLight castShadow position={[8, 18, 10]} intensity={3.5} shadow-mapSize={[2048, 2048]} />
          <directionalLight position={[-12, 8, -8]} color="#6bbdc5" intensity={1.3} />
          <City onSelect={setInfo} />
          <CityDetails onSelect={setInfo} />
          <WaterChannel flowing={flowing} onSelect={setInfo} />
          <StudentPlatform onSelect={setInfo} />
          <SensorStation readings={readings} onSelect={setInfo} />
          <SamplingChamber onSelect={setInfo} />
          <FiltrationSystem progress={filterProgress} onSelect={setInfo} />
          <Environment preset="city" environmentIntensity={0.28} />
          <CameraRig cameraTarget={focusTargets[focus]} />
        </Canvas>
        <div className="scene-vignette" />
        <header className="topbar">
          <div className="brand-lockup"><div className="brand-mark"><Waves size={20} /></div><div><div className="eyebrow">URBAN LEARNING INFRASTRUCTURE</div><h1>AQUEDUCT <span>PROTOCOL</span></h1><div className="brand-subtitle">Urban Infrastructure × Education × AI</div></div></div>
          <div className="topbar-meta"><span className="live-dot" /> LIVE SIMULATION <span className="divider" /> DELHI / SECTOR 08</div>
        </header>
        <div className="prototype-description">An interactive learning sandbox for understanding real-world urban water systems.</div>
        <DemoOverlay step={demoStep} running={demoRunning} paused={demoPaused} onStart={startDemo} onPause={() => setDemoPaused((current) => !current)} onRestart={restartDemo} onSkip={skipDemoStep} />
        {demoRunning && <div className="demo-narrative"><div className="toast-kicker">DEMO NARRATIVE</div><strong>{demoSteps[demoStep].title}</strong><p>{demoSteps[demoStep].body}</p></div>}
        <div className="scene-label label-channel"><span>01</span> URBAN WATER CHANNEL</div>
        <div className="scene-label label-station"><span>02</span> SENSOR STATION</div>
        <div className="scene-label label-platform"><span>03</span> SAFE LEARNING DECK</div>
        <div className="camera-controls">
          <button className={focus === 'city' ? 'active' : ''} onClick={() => setFocus('city')}><Eye size={14} /> CITY VIEW</button>
          <button className={focus === 'sensor' ? 'active' : ''} onClick={() => setFocus('sensor')}><Gauge size={14} /> SENSOR VIEW</button>
          <button className={focus === 'filtration' ? 'active' : ''} onClick={() => setFocus('filtration')}><Layers3 size={14} /> FILTRATION</button>
          <button className={focus === 'students' ? 'active' : ''} onClick={() => setFocus('students')}><Activity size={14} /> STUDENT VIEW</button>
        </div>
        <div className="scene-actions">
          <button className={flowing ? 'action active-action' : 'action'} onClick={() => setFlowing(true)}><Play size={15} fill="currentColor" /> START FLOW</button>
          <button className={!flowing ? 'action active-action' : 'action'} onClick={() => setFlowing(false)}><StopCircle size={15} /> STOP FLOW</button>
          <button className="icon-button" onClick={() => resetSystem()} title="Reset system"><RotateCcw size={16} /></button>
        </div>
        <div className="info-toast">{info ? <><div className="toast-kicker">OBJECT INSPECTION</div><strong>{info.title}</strong><p>{info.body}</p></> : <><div className="toast-kicker"><ShieldCheck size={13} /> SAFETY STATUS</div><strong>CONTROLLED OBSERVATION ZONE</strong><p>Protected deck · Side-stream only · No direct contact with untreated water</p></>}</div>
      </section>
      <aside className="control-rail">
        <Dashboard flowing={flowing} readings={readings} sensorState={sensorState} filtrationState={filtrationState} />
        <div className="rail-scroll">
          <section className="panel test-panel"><div className="panel-title"><span><FlaskConical size={16} /> CONTROLLED SAMPLING</span><span className="status-pill">SIMULATED</span></div><p className="panel-description">Use the isolated side-stream chamber to run a safe learning test.</p><button className="primary-button" onClick={runTest} disabled={testState !== 'READY'}>{testState === 'READY' ? 'RUN WATER TEST' : testState === 'COMPLETE' ? 'TEST COMPLETE' : `${testState}...`}<ChevronRight size={17} /></button><div className="demo-note">SIMULATED DEMO DATA · NOT A REAL MEASUREMENT</div></section>
          <section className="panel filtration-panel"><div className="panel-title"><span><Droplets size={16} /> FILTRATION MODULE</span><span className={`state-text ${filtrationState === 'COMPLETE' ? 'green' : ''}`}>{filtrationState}</span></div><div className="stage-track"><span className={filterProgress >= 25 ? 'done' : ''}>SCREEN</span><span className={filterProgress >= 50 ? 'done' : ''}>SETTLE</span><span className={filterProgress >= 75 ? 'done' : ''}>BIO</span><span className={filterProgress >= 100 ? 'done' : ''}>FINAL</span></div><div className="progress-bar"><i style={{ width: `${filterProgress}%` }} /></div><div className="before-after"><div><small>BEFORE</small><b>{filterBefore} <em>NTU</em></b></div><div className="arrow">→</div><div><small>AFTER</small><b className="green">{filterProgress ? filterAfter : '--'} <em>NTU</em></b></div></div><button className="secondary-button" onClick={runFiltration} disabled={filtrationState === 'RUNNING'}><Zap size={15} /> {filtrationState === 'RUNNING' ? 'FILTERING...' : 'RUN FILTRATION'}</button><div className="demo-note">SIMULATED DEMONSTRATION VALUES</div></section>
          <GeminiAssistant resetToken={missionResetToken} readings={readings} demoPrompt={demoPrompt} demoResponse={demoPrompt ? 'High turbidity means more suspended particles are present in the water. Use the sensor trend to form a hypothesis, then compare the simulated filtration result.' : ''} />
          <LearningMission resetToken={missionResetToken} demoComplete={demoMissionComplete} onFocusSensor={() => setFocus('sensor')} onFocusFiltration={() => setFocus('filtration')} />
        </div>
        <footer className="rail-footer"><Sun size={15} /> SOLAR ARRAY ONLINE <span>·</span> <span className="green">GRID INDEPENDENT</span></footer>
      </aside>
    </main>
  );
}
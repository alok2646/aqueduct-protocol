import React, { useEffect, useState } from 'react';
import { Bot, LoaderCircle, Send } from 'lucide-react';

function fallbackAnswer(question, readings) {
  const prompt = question.toLowerCase();
  if (prompt.includes('turbidity')) return `Turbidity describes how cloudy water appears because of suspended particles. The current simulated value is ${readings.turbidity} NTU, so investigate the filtration stages and compare the before/after trend.`;
  if (prompt.includes('ph')) return `pH helps us understand acidity or alkalinity. This simulated reading is ${readings.pH}; compare it with the other indicators rather than reading it in isolation.`;
  if (prompt.includes('investigate') || prompt.includes('what')) return 'Start with the turbidity trend, inspect the sensor station, then run the filtration demonstration. Record a hypothesis before comparing the simulated result.';
  return `The simulated sensor reports pH ${readings.pH}, turbidity ${readings.turbidity} NTU, temperature ${readings.temperature} C, conductivity ${readings.conductivity} uS/cm, and dissolved oxygen ${readings.oxygen} mg/L. Look for relationships between these values.`;
}

export default function GeminiAssistant({ readings, demoPrompt = '', demoResponse = '', resetToken = 0 }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('Ask a question about the live simulated readings.');
  const [status, setStatus] = useState('GEMINI AI · DEMO FALLBACK');
  const [loading, setLoading] = useState(false);

  async function askQuestion(nextQuestion = question) {
    const trimmedQuestion = nextQuestion.trim();
    if (!trimmedQuestion || loading) return;
    setQuestion(trimmedQuestion);
    setLoading(true);
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: trimmedQuestion,
          sensorData: {
            ph: Number(readings.pH),
            turbidity: Number(readings.turbidity),
            temperature: Number(readings.temperature),
            conductivity: Number(readings.conductivity),
            dissolvedOxygen: Number(readings.oxygen),
          },
        }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.answer) throw new Error(payload.error || 'Gemini request failed.');
      setAnswer(payload.answer);
      setStatus('GEMINI AI • LIVE');
    } catch {
      setAnswer(demoResponse || fallbackAnswer(trimmedQuestion, readings));
      setStatus('GEMINI AI • DEMO FALLBACK');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (demoPrompt) askQuestion(demoPrompt);
  }, [demoPrompt]);

  useEffect(() => {
    setQuestion('');
    setAnswer('Ask a question about the live simulated readings.');
    setStatus('GEMINI AI • DEMO FALLBACK');
    setLoading(false);
  }, [resetToken]);

  return <section className="panel assistant-panel"><div className="panel-title"><span><Bot size={16} /> GEMINI LEARNING ASSISTANT</span><span className="ai-badge">{status}</span></div><div className="chat-flow"><div className="chat-label">STUDENT QUESTION</div><div className="question-box">{question || 'What should I investigate?'}</div><div className="chat-arrow">↓</div><div className="assistant-response"><div className="response-head"><Bot size={14} /> {loading ? 'GEMINI · ANALYZING' : 'GEMINI · RESPONSE'}</div><p>{loading ? 'Reading the simulated sensor context...' : answer}</p></div></div><div className="ask-row"><input value={question} onChange={(event) => setQuestion(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && askQuestion()} placeholder="Ask about water quality..." disabled={loading} /><button onClick={() => askQuestion()} title="Ask Gemini" disabled={loading || !question.trim()}>{loading ? <LoaderCircle className="spin" size={15} /> : <Send size={15} />}</button></div><div className="demo-note">SIMULATED DEMO DATA · NO API KEY IN FRONTEND · LIVE RESPONSES FALL BACK TO DEMO MODE</div></section>;
}

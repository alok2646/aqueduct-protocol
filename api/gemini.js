import { GoogleGenAI } from '@google/genai';

const MAX_QUESTION_LENGTH = 600;
const REQUEST_TIMEOUT_MS = 12000;

const systemInstruction = `You are the educational assistant for Aqueduct Protocol, a protected urban water-learning sandbox.
Explain environmental and water concepts in simple, student-friendly language. Explain pH, turbidity, temperature, conductivity, and dissolved oxygen, and connect readings to the current learning experiment.
Sensor values are always SIMULATED DEMONSTRATION DATA, not real measurements. Never claim they indicate real-world water safety or treatment performance.
Never tell students to touch, enter, collect from, or handle untreated wastewater. Emphasize protected observation and isolated controlled side-stream testing.
Keep responses concise and useful for a live demonstration.`;

function isValidSensorData(sensorData) {
  if (!sensorData || typeof sensorData !== 'object') return false;
  return ['ph', 'turbidity', 'temperature', 'conductivity', 'dissolvedOxygen'].every((key) => Number.isFinite(Number(sensorData[key])));
}

function json(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json').send(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed.' });
  if (!process.env.GEMINI_API_KEY) return json(res, 503, { error: 'Gemini is not configured on the server.' });

  let body;
  try {
    body = req.body || {};
  } catch {
    return json(res, 400, { error: 'Request body must be valid JSON.' });
  }
  const { question, sensorData } = body;
  if (typeof question !== 'string' || !question.trim()) return json(res, 400, { error: 'A non-empty question is required.' });
  if (question.length > MAX_QUESTION_LENGTH) return json(res, 400, { error: 'Question is too long.' });
  if (!isValidSensorData(sensorData)) return json(res, 400, { error: 'Valid simulated sensor data is required.' });

  const prompt = `Student question: ${question.trim()}

Current simulated sensor data:
- pH: ${Number(sensorData.ph)}
- Turbidity: ${Number(sensorData.turbidity)} NTU
- Temperature: ${Number(sensorData.temperature)} C
- Conductivity: ${Number(sensorData.conductivity)} uS/cm
- Dissolved oxygen: ${Number(sensorData.dissolvedOxygen)} mg/L

Answer the student directly in 2-4 concise sentences. Mention that these are simulated demonstration values when relevant.`;

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await Promise.race([
      ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: { systemInstruction },
      }),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Gemini request timed out.')), REQUEST_TIMEOUT_MS)),
    ]);
    const answer = response.text?.trim();
    if (!answer) return json(res, 502, { error: 'Gemini returned an empty response.' });
    return json(res, 200, { answer });
  } catch (error) {
    console.error('Gemini request failed:', error.message);
    return json(res, 502, { error: 'Gemini could not answer this request.' });
  }
}

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY ?? '';
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
const MODELS = ['gemini-3.1-flash-lite', 'gemini-2.0-flash'];

export interface FoodRecommendation {
  name: string;
  dish: string;
  vibe: string;
  distance: string;
  stars: string;
  price: string;
}

export interface LocationDetails {
  mustSee: string;
  about: string;
  highlights: string[];
  tips: string[];
  bestTime: string;
  duration: string;
  gettingThere: string;
  nearbyFood: FoodRecommendation[];
  funFact: string;
}

const cache = new Map<string, LocationDetails>();

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const RETRY_DELAYS: Record<number, number[]> = {
  503: [1000, 2000],
};

async function callGemini(model: string, prompt: string, retries = 2): Promise<string> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const res = await fetch(`${BASE_URL}/${model}:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.5,
          maxOutputTokens: 2048,
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'OBJECT',
            properties: {
              mustSee:     { type: 'STRING' },
              about:       { type: 'STRING' },
              highlights:  { type: 'ARRAY', items: { type: 'STRING' } },
              tips:        { type: 'ARRAY', items: { type: 'STRING' } },
              bestTime:    { type: 'STRING' },
              duration:    { type: 'STRING' },
              gettingThere:{ type: 'STRING' },
              nearbyFood: {
                type: 'ARRAY',
                items: {
                  type: 'OBJECT',
                  properties: {
                    name:     { type: 'STRING' },
                    dish:     { type: 'STRING' },
                    vibe:     { type: 'STRING' },
                    distance: { type: 'STRING' },
                    stars:    { type: 'STRING' },
                    price:    { type: 'STRING' },
                  },
                  required: ['name', 'dish', 'vibe', 'distance', 'stars', 'price'],
                },
              },
              funFact:     { type: 'STRING' },
            },
            required: ['mustSee', 'about', 'highlights', 'tips', 'bestTime', 'duration', 'gettingThere', 'nearbyFood', 'funFact'],
          },
        },
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    }

    if (res.status === 429) throw new Error('RATE_LIMIT');

    const delays = RETRY_DELAYS[res.status];
    if (delays && attempt < retries) {
      await sleep(delays[attempt] ?? delays[delays.length - 1]);
      continue;
    }

    throw new Error(`${res.status}`);
  }
  throw new Error('503');
}

export async function fetchLocationDetails(
  name: string,
  city: string,
  lang: 'en' | 'zh' = 'en',
  mode: 'default' | 'food' = 'default',
): Promise<LocationDetails> {
  const cacheKey = `${name}::${city}::${lang}::${mode}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey)!;

  if (!API_KEY) throw new Error('EXPO_PUBLIC_GEMINI_API_KEY is not set in .env');

  const langInstruction = lang === 'zh'
    ? '请用中文回答。'
    : 'Respond in English.';

  const prompt = mode === 'food'
    ? `You are a local food expert. I am having "${name}" in ${city}, Spain. ${langInstruction}
Recommend the best restaurants and food options. Favour places that are: well-regarded by locals, authentic, highly rated, NOT tourist traps.
For "nearbyFood", return 6 entries: 4 local Spanish/regional places and 1 Japanese and 1 Chinese restaurant.
For "tips", give practical dining tips (e.g. reservation advice, best dishes, dietary options, meal times).
For "highlights", list 4 must-try local dishes or food experiences in ${city}.
For "funFact", share a fun fact about the local food culture or a signature dish.
Leave "mustSee", "about", "bestTime", "duration", "gettingThere" as empty strings.
Respond ONLY with valid JSON — no markdown, no code fences — in this exact format:
{
  "mustSee": "",
  "about": "",
  "highlights": ["must-try dish or food experience 1", "dish 2", "dish 3", "dish 4"],
  "tips": ["dining tip 1", "tip 2", "tip 3"],
  "bestTime": "",
  "duration": "",
  "gettingThere": "",
  "nearbyFood": [
    { "name": "local Spanish place 1", "dish": "signature dish to order", "vibe": "e.g. lively tapas bar", "distance": "e.g. 3-min walk", "stars": "e.g. 4.5 ⭐", "price": "e.g. €10–15/person" },
    { "name": "local Spanish place 2", "dish": "dish 2", "vibe": "vibe 2", "distance": "distance 2", "stars": "stars 2", "price": "price 2" },
    { "name": "local Spanish place 3", "dish": "dish 3", "vibe": "vibe 3", "distance": "distance 3", "stars": "stars 3", "price": "price 3" },
    { "name": "local Spanish place 4", "dish": "dish 4", "vibe": "vibe 4", "distance": "distance 4", "stars": "stars 4", "price": "price 4" },
    { "name": "Japanese restaurant nearby", "dish": "recommended Japanese dish", "vibe": "e.g. cozy ramen shop", "distance": "distance 5", "stars": "stars 5", "price": "price 5" },
    { "name": "Chinese restaurant nearby", "dish": "recommended Chinese dish", "vibe": "e.g. authentic dim sum", "distance": "distance 6", "stars": "stars 6", "price": "price 6" }
  ],
  "funFact": "one fun fact about local food culture or a signature dish"
}`
    : `You are a travel guide. Tell me about "${name}" in ${city}, Spain. ${langInstruction}
For nearby food recommendations, favour places that are: well-regarded by locals, authentic, highly rated, NOT tourist traps, and within walking distance of the location.
Respond ONLY with valid JSON — no markdown, no code fences — in this exact format:
{
  "mustSee": "the single most unmissable thing at this location",
  "about": "2-3 sentences covering history and significance",
  "highlights": ["what to see or do — point 1", "point 2", "point 3", "point 4"],
  "tips": ["practical visitor tip 1", "tip 2", "tip 3"],
  "bestTime": "best time of day and/or season to visit",
  "duration": "recommended visit duration e.g. 1–2 hours",
  "gettingThere": "how to reach it by public transport or on foot",
  "nearbyFood": [
    { "name": "local Spanish place 1", "dish": "signature Spanish dish to order", "vibe": "e.g. lively tapas bar", "distance": "e.g. 3-min walk", "stars": "e.g. 4.5 ⭐", "price": "e.g. €10–15/person" },
    { "name": "local Spanish place 2", "dish": "dish 2", "vibe": "vibe 2", "distance": "distance 2", "stars": "stars 2", "price": "price 2" },
    { "name": "local Spanish place 3", "dish": "dish 3", "vibe": "vibe 3", "distance": "distance 3", "stars": "stars 3", "price": "price 3" },
    { "name": "local Spanish place 4", "dish": "dish 4", "vibe": "vibe 4", "distance": "distance 4", "stars": "stars 4", "price": "price 4" },
    { "name": "Japanese restaurant nearby", "dish": "recommended Japanese dish", "vibe": "e.g. cozy ramen shop", "distance": "distance 5", "stars": "stars 5", "price": "price 5" },
    { "name": "Chinese restaurant nearby", "dish": "recommended Chinese dish", "vibe": "e.g. authentic dim sum", "distance": "distance 6", "stars": "stars 6", "price": "price 6" }
  ],
  "funFact": "one surprising or little-known fact"
}`;

  let raw = '';
  for (const model of MODELS) {
    try {
      raw = await callGemini(model, prompt);
      break;
    } catch (e: any) {
      if (e.message === 'RATE_LIMIT') {
        throw new Error('RATE_LIMIT');
      }
      if (model === MODELS[MODELS.length - 1]) {
        throw new Error(`Gemini unavailable (${e.message}). Please try again shortly.`);
      }
    }
  }

  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('Gemini returned an unexpected response format. Please try again.');
  let parsed: LocationDetails;
  try {
    parsed = JSON.parse(match[0]);
  } catch {
    throw new Error('Failed to parse Gemini response. Please try again.');
  }
  cache.set(cacheKey, parsed);
  return parsed;
}

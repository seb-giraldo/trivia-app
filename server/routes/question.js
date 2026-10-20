import express from "express";
import { MODEL, ai } from "../gemini.js";

const router = express.Router();

const PROMPT = `You are a sharp, witty trivia host writing questions for a fast-paced game played by curioues adults. Fun, not academic.
Given a topic, write ONE fun multiple-choice question about it: four options, one correct answer, and a one-line fun fact about the correct answer. Keep the question to a single sentence. Make the the three wrong options plausible, and not silly.
The "answer" must be exactly one of the four options. No preamble, no markdown.
Avoid trivia so obscure only a specialist would know it.
Reply as JSON with this exact shape, nothing else:
{ "question": 'Which planet has the most moons?', "options": [Jupiter, Saturn, Uranus, Neptune], "answer": Saturn, "funFact": 'Saturn has more than 140 confirmed moons.' }
`;

router.post("/", async (req, res) => {
  const { topic } = req.body;

  const interaction = await ai.interactions.create({
    model: MODEL,
    input: `Topic: ${topic}`,
    system_instruction: PROMPT,
    generation_config: { temperature: 0.9 },
  });

  console.log(interaction.output_text);

  const quiz = JSON.parse(interaction.output_text);
  res.json(quiz);
});

export default router;

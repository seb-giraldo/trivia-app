import express from "express";
import { MODEL, ai } from "../gemini.js";

const router = express.Router();

const PROMPT = `You are a careful trivia host.
Given a trivia question, write ONE short hint that nudges the player toward the answer without giving it away.
Do not state the answer, repeat it, use a synonym that directly identifies it, or include its first letter.
Keep the hint to one sentence and under 20 words. No preamble, no markdown.
Reply as JSON with this exact shape, nothing else:
{ "hint": "A short clue that helps without revealing the answer." }
`;

router.post("/", async (req, res) => {
  const question = typeof req.body?.question === "string" ? req.body.question.trim() : "";

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  try {
    const interaction = await ai.interactions.create({
      model: MODEL,
      input: `Question: ${question}`,
      system_instruction: PROMPT,
      generation_config: { temperature: 0.7 },
      response_format: { type: "text", mime_type: "application/json" },
    });

    const result = JSON.parse(interaction.output_text);
    const hint = typeof result.hint === "string" ? result.hint.trim() : "";

    if (!hint) {
      return res.status(502).json({ error: "Unable to generate a hint" });
    }

    res.json({ hint });
  } catch {
    res.status(502).json({ error: "Unable to generate a hint" });
  }
});

export default router;

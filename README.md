# Trivia App

This app is a small interactive trivia app built to demonstrate practical AI integration in a full-stack application. Players can generate a question from a topic or an image, request a hint, and see whether they chose the right answer.

## Features

- **Topic-based questions:** Enter a subject and generate a multiple-choice question with four options, one correct answer, and a related fun fact.
- **Photo round:** Upload an image and ask the AI to create a multiple-choice question about what it sees.
- **On-demand hints:** Request a short clue designed to help without revealing the answer.
- **Interactive play:** See correct and incorrect choices highlighted, read the answer's fun fact, and keep a score during the current session.

## AI integration

The Express server uses Google's `@google/genai` SDK and the **Gemini 3.6 Flash** model through the Gemini Interactions API. AI requests are made on the server, not directly from the browser.

- The question endpoint sends the player's topic with instructions to produce one entertaining, accessible question with plausible distractors and a fun fact.
- The photo endpoint sends the uploaded image as image input alongside a text prompt. The model interprets the image and returns a question and four answer options.
- The hint endpoint sends the current question and asks for a concise clue that does not give away the answer.
- Prompts request structured JSON output for the client to render. Generation temperature is set per flow: `0.9` for questions and `0.7` for hints.

The Google API key stays in the server environment. Vite proxies browser requests under `/api` to the local Express server during development.

## Tech stack

- **Frontend:** React 19 and Vite
- **Backend:** Node.js and Express
- **Generative AI:** Google GenAI SDK and Gemini 3.6 Flash

## Run locally

Prerequisites: Node.js and a Gemini API key.

1. Install the frontend dependencies:

   ```bash
   cd client
   npm install
   ```

2. Install the server dependencies:

   ```bash
   cd ../server
   npm install
   ```

3. Create `server/.env` and add your API key:

   ```env
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. Start the API server in one terminal:

   ```bash
   cd server
   npm run dev
   ```

   The server listens on port `3001` by default. Set `PORT` in `server/.env` to change it.

5. Start the frontend in another terminal:

   ```bash
   cd client
   npm run dev
   ```

   Open the local URL printed by Vite. The Vite development server forwards `/api` requests to the Express server.

To create a production frontend build, run `npm run build` from the `client` directory.

## API routes

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | Check that the API server is running |
| `POST` | `/api/question` | Generate a question from `{ "topic": "..." }` |
| `POST` | `/api/photo` | Generate a question from `{ "image": "<base64>", "mimeType": "image/..." }` |
| `POST` | `/api/hint` | Generate a hint from `{ "question": "..." }` |

AI-generated questions and facts may be inaccurate; treat them as generated demo content rather than authoritative reference material.

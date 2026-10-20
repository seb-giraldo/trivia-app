import "dotenv/config";
import express from "express";
import questionRoutes from "./routes/question.js";
import photoRoutes from "./routes/photo.js";
import hintRoutes from "./routes/hint.js";

const app = express();

// A bigger limit than usual, because the photo round sends an image
// to the server as a base64 string inside the JSON body.
app.use(express.json({ limit: "10mb" }));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/question", questionRoutes);
app.use("/api/photo", photoRoutes);
app.use("/api/hint", hintRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`AI Trivia API running on http://localhost:${port}`);
});

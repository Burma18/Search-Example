import express, { response } from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);

app.use(express.json());

app.get("/ping", async (req, res) => {
  res.status(200).send("pong");
});

const requestCounts: Record<string, { count: number; lastReset: number }> = {};
const MAX_REQUESTS = 20;
const WINDOW_MS = 5 * 1000;

const limiter = (req: any, res: any, next: any) => {
  const ip = req.ip;
  const now = Date.now();

  if (!requestCounts[ip] || requestCounts[ip].lastReset + WINDOW_MS < now) {
    requestCounts[ip] = { count: 0, lastReset: now };
  }

  if (requestCounts[ip].count >= MAX_REQUESTS) {
    return response.status(429).json({
      error: "Too Many Requests",
      message: `Wait around ${WINDOW_MS / 1000}s`,
    });
  }

  requestCounts[ip].count++;
  next();
};

app.listen(3000, () => console.log("server is listening at: ", 3000));

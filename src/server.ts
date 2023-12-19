import express from "express";
import cors from "cors";
import { searchEngine } from "./search/searchInstance";

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
  const ip = "185.117.149.1";
  const now = Date.now();

  if (!requestCounts[ip] || requestCounts[ip].lastReset + WINDOW_MS < now) {
    requestCounts[ip] = { count: 0, lastReset: now };
  }

  if (requestCounts[ip].count >= MAX_REQUESTS) {
    return res.status(429).json({
      error: "Too Many Requests",
      message: `Wait around ${WINDOW_MS / 1000}s`,
    });
  }

  requestCounts[ip].count++;
  next();
};

app.get("/search", limiter, async (req: any, res: any) => {
  try {
    const { query, count } = req.query;

    const decodedQuery = decodeURIComponent(query as string);

    const pages = await searchEngine.search(decodedQuery);

    const countOfResult = count ? parseInt(count as string) : pages.length;

    const result = pages.slice(0, countOfResult);

    res.status(200).json({
      count: result.length,
      result,
    });
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
});

app.listen(3000, () => console.log("server is listening at: ", 3000));

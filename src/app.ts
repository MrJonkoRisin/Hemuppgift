import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.text());

app.post("/count", (req: Request, res: Response, next: NextFunction) => {
  try {
    const text: string = req.body;

    const cleanedText: string = text
      .replace(/[^\w\såäöÅÄÖ]/gi, "")
      .toLowerCase();

    const words: string[] = cleanedText.split(" ");

    const wordFrequencyMap: { [word: string]: number } = {};

    words.forEach((word) => {
      if (word !== "") {
        if (word in wordFrequencyMap) {
          wordFrequencyMap[word]++;
        } else {
          wordFrequencyMap[word] = 1;
        }
      }
    });

    const sortedWordFrequency: { [word: string]: number } = {};

    const wordEntries = Object.entries(wordFrequencyMap);

    const sortedEntries = wordEntries.sort((a, b) => b[1] - a[1]);

    const slicedEntries = sortedEntries.slice(0, 10);

    slicedEntries.forEach(([word, frequency]: [string, number]) => {
      sortedWordFrequency[word] = frequency;
    });

    res.status(200).json(sortedWordFrequency);
  } catch (error) {
    next(error);
  }
});

app.use((req, res, next) => {
  next(Error("Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occured";
  if (error instanceof Error) errorMessage = error.message;
  res.status(500).json({ error: errorMessage });
});

app.listen(port, () => {
  console.log("Server running on port: " + port);
});

export default app;

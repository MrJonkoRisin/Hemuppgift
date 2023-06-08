import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import createHttpError, { isHttpError } from "http-errors";

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.text());

/**
 * 
 * @param text - The input to be separated
 * @returns - An array of words
 */
function separateWords(text: string): string[]{
  const cleanedText: string = cleanText(text);
  return cleanedText.split(" ");
}

/**
 * Removes special characters (exept swedish letters) and converts to lowercase
 * @param text - the input to be cleaned
 * @returns {string} - The cleaned text
 */
function cleanText(text: string): string {
  return text.replace(/[^\w\såäöÅÄÖ]/gi, "").toLowerCase();
}

/**
 * Counts the word frequency in an array of words. 
 * @param {string[]} words - The array of words.
 * @returns {Object} - The word frequency map.
 */
function countWordFrequency(words: string[]): { [word: string]: number } {
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

  return wordFrequencyMap;
}
/**
 * Sorts the word frequency map by biggest frequency first.
 * @param wordFrequencyMap - The word frequency map.
 * @returns - The sorted entries of the word frequency map.
 */
function sortWordFrequencyMap(wordFrequencyMap: {
  [word: string]: number;
}): [string, number][] {
  
  const wordEntries = Object.entries(wordFrequencyMap);

  return wordEntries.sort((a, b) => b[1] - a[1]);
}
/**
 * Retrieves the top word frequency entries from sorted entries.
 * @param sortedEntries - The sorted entries of the word frequency map.
 * @param limit - The amount of entries to retrieve
 * @returns - The top word frequency map.
 */
function getTopWordFrequencyByLimit(
  sortedEntries: [string, number][],
  limit: number
): { [word: string]: number } {

  const slicedEntries = sortedEntries.slice(0, limit);
  
  const sortedWordFrequency: { [word: string]: number } = {};

  slicedEntries.forEach(([word, frequency]: [string, number]) => {
    sortedWordFrequency[word] = frequency;
  });
  
  return sortedWordFrequency;
}

app.post("/count", (req: Request, res: Response, next: NextFunction) => {
  try {
    const text: string = req.body;

    const words: string[] = separateWords(text);

    const wordFrequencyMap = countWordFrequency(words);

    const sortedWordFrequencyMap = sortWordFrequencyMap(wordFrequencyMap);

    const topWordFrequency = getTopWordFrequencyByLimit(sortedWordFrequencyMap, 10);

    res.status(200).json(topWordFrequency);
  } catch (error) {
    next(error);
  }
});

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occurred";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

app.listen(port, () => {
  console.log("Server running on port: " + port);
});

export default app;

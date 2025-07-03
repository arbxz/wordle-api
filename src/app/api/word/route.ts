import { NextResponse } from "next/server";

// Define supported languages and their word sources
const SUPPORTED_LANGUAGES = {
  en: "words-en.json",
  es: "words-es.json",
  fr: "words-fr.json",
  de: "words-de.json",
} as const;

type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;

async function getWordList(lang: SupportedLanguage) {
  switch (lang) {
    case "es":
      return (await import("../../../data/words-es.json")).default;
    case "fr":
      return (await import("../../../data/words-fr.json")).default;
    case "de":
      return (await import("../../../data/words-de.json")).default;
    default:
      return (await import("../../../data/words-en.json")).default;
  }
}

export async function GET(request: Request) {
  const apiKey = request.headers.get("x-api-key");
  if (apiKey !== process.env.API_KEY) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Get language from query parameter
  const { searchParams } = new URL(request.url);
  const lang = (searchParams.get("lang") || "en") as SupportedLanguage;

  // Validate language
  if (!(lang in SUPPORTED_LANGUAGES)) {
    return NextResponse.json(
      {
        error: `Unsupported language: ${lang}. Supported languages: ${Object.keys(
          SUPPORTED_LANGUAGES
        ).join(", ")}`,
      },
      { status: 400 }
    );
  }

  const wordsData = await getWordList(lang);
  const wordList = wordsData.words;

  // Use UTC for consistent daily words across timezones
  const today = new Date();
  const utcToday = new Date(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate()
  );
  const start = new Date("2024-01-01T00:00:00.000Z");

  const diff = Math.floor(
    (utcToday.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );
  const word = wordList[diff % wordList.length];

  return NextResponse.json({
    word,
    language: lang,
    date: utcToday.toISOString().split("T")[0],
  });
}

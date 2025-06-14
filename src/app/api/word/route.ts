import { NextResponse } from "next/server";

import words from "../../../data/words.json";

export async function GET(request: Request) {
  const apiKey = request.headers.get("x-api-key");
  if (apiKey !== process.env.API_KEY) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const wordList = words.words;

  const today = new Date();
  const start = new Date("2024-01-01");
  const diff = Math.floor(
    (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );
  const word = wordList[diff % wordList.length];

  return NextResponse.json({ word });
}

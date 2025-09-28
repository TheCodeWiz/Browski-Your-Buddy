
import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    if (!message) {
      return NextResponse.json(
        { error: "Message is required!" },
        { status: 400 }
      );
    }
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: "openai/gpt-oss-120b",
    });
    const responseMessage =
      chatCompletion.choices[0]?.message?.content || "No Response From LLama 3";
    return NextResponse.json({
      response: responseMessage,
    });
  } catch (error) {
    console.error("error in chat route", error);
    return NextResponse.json(
      { error: "Internal Server error" },
      { status: 500 }
    );
  }
}

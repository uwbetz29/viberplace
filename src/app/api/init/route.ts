import { initDb } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await initDb();
    return NextResponse.json({ message: "Database initialized" });
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}

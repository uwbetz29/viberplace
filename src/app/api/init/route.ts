import { initDb, getDb } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await initDb();

    // Migrate existing table: add columns for Google auth support
    const sql = getDb();
    try {
      await sql`ALTER TABLE users ALTER COLUMN github_id DROP NOT NULL`;
    } catch { /* column may already be nullable */ }
    try {
      await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS google_id VARCHAR(255) UNIQUE`;
    } catch { /* column may already exist */ }
    try {
      await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS email VARCHAR(255)`;
    } catch { /* column may already exist */ }
    try {
      await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS provider VARCHAR(50) DEFAULT 'github'`;
    } catch { /* column may already exist */ }

    return NextResponse.json({ message: "Database initialized and migrated" });
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}

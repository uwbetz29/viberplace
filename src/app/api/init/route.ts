import { initDb, getDb } from "@/lib/db";
import { NextResponse } from "next/server";

// Hardcoded superuser — cannot be demoted
const SUPERUSER_EMAIL = "mikebetz.com@gmail.com";

export async function GET() {
  try {
    await initDb();

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

    // Ensure superuser has admin role
    await sql`UPDATE users SET role = 'admin' WHERE email = ${SUPERUSER_EMAIL}`;

    // Also set first user as admin fallback
    const users = await sql`SELECT id, username, email, role FROM users ORDER BY id ASC LIMIT 5`;

    return NextResponse.json({
      message: "Database initialized and migrated",
      superuser: SUPERUSER_EMAIL,
      users: users.map((u) => ({ username: u.username, email: u.email, role: u.role })),
    });
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}

import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { NextResponse } from "next/server";

const SUPERUSER_EMAIL = "mikebetz.com@gmail.com";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) return null;

  const sql = getDb();
  const username = (session.user as any).username as string;
  const users = await sql`SELECT id, role, email FROM users WHERE username = ${username}`;
  if (users.length === 0 || users[0].role !== "admin") return null;

  return {
    userId: users[0].id as number,
    username,
    email: users[0].email as string,
    isSuperuser: users[0].email === SUPERUSER_EMAIL,
  };
}

// GET - List all users (admin only)
export async function GET() {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const sql = getDb();

  const users = await sql`
    SELECT u.*,
      (SELECT COUNT(*) FROM apps WHERE user_id = u.id) as app_count,
      (SELECT COUNT(*) FROM apps WHERE user_id = u.id AND status = 'published') as published_count
    FROM users u
    ORDER BY u.created_at DESC
  `;

  return NextResponse.json(users);
}

// PATCH - Update user role or details (admin only)
export async function PATCH(req: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { userId, action, value } = body;

  const sql = getDb();

  // Look up the target user
  const targets = await sql`SELECT id, email, role FROM users WHERE id = ${userId}`;
  if (targets.length === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const target = targets[0];

  // Anti-escalation: only superuser can modify other admins
  if (target.role === "admin" && target.email === SUPERUSER_EMAIL) {
    return NextResponse.json({ error: "Cannot modify superuser" }, { status: 403 });
  }

  if (action === "set_role") {
    if (!["admin", "member"].includes(value)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }
    // Only superuser can grant admin
    if (value === "admin" && !admin.isSuperuser) {
      return NextResponse.json({ error: "Only superuser can grant admin role" }, { status: 403 });
    }
    await sql`UPDATE users SET role = ${value} WHERE id = ${userId}`;
    return NextResponse.json({ success: true, role: value });
  }

  if (action === "update_username") {
    if (!value || typeof value !== "string" || value.length < 2) {
      return NextResponse.json({ error: "Invalid username" }, { status: 400 });
    }
    const existing = await sql`SELECT id FROM users WHERE username = ${value} AND id != ${userId}`;
    if (existing.length > 0) {
      return NextResponse.json({ error: "Username already taken" }, { status: 409 });
    }
    await sql`UPDATE users SET username = ${value} WHERE id = ${userId}`;
    return NextResponse.json({ success: true });
  }

  if (action === "update_bio") {
    await sql`UPDATE users SET bio = ${value || ""} WHERE id = ${userId}`;
    return NextResponse.json({ success: true });
  }

  // Bulk unpublish all of a user's apps
  if (action === "unpublish_all_apps") {
    await sql`UPDATE apps SET status = 'unlisted', updated_at = NOW() WHERE user_id = ${userId}`;
    return NextResponse.json({ success: true });
  }

  // Bulk publish all of a user's apps
  if (action === "publish_all_apps") {
    await sql`UPDATE apps SET status = 'published', updated_at = NOW() WHERE user_id = ${userId}`;
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}

// DELETE - Delete a user and all their apps (admin only)
export async function DELETE(req: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { userId } = await req.json();

  if (userId === admin.userId) {
    return NextResponse.json({ error: "Cannot delete your own account" }, { status: 400 });
  }

  const sql = getDb();

  // Check if target is superuser
  const targets = await sql`SELECT email FROM users WHERE id = ${userId}`;
  if (targets.length > 0 && targets[0].email === SUPERUSER_EMAIL) {
    return NextResponse.json({ error: "Cannot delete superuser" }, { status: 403 });
  }

  // CASCADE will delete their apps too
  await sql`DELETE FROM users WHERE id = ${userId}`;

  return NextResponse.json({ success: true });
}

import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { NextResponse } from "next/server";

// GET a single app
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const sql = getDb();

  const apps = await sql`
    SELECT a.*, u.username, u.avatar_url
    FROM apps a
    JOIN users u ON a.user_id = u.id
    WHERE a.id = ${parseInt(id)}
  `;

  if (apps.length === 0) {
    return NextResponse.json({ error: "App not found" }, { status: 404 });
  }

  return NextResponse.json(apps[0]);
}

// PUT - Update an app (owner only)
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const sql = getDb();

  // Verify ownership
  const username = (session.user as any).username as string;
  const users = await sql`SELECT id, role FROM users WHERE username = ${username}`;
  if (users.length === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const userId = users[0].id as number;
  const isAdmin = users[0].role === "admin";

  const apps = await sql`SELECT * FROM apps WHERE id = ${parseInt(id)}`;
  if (apps.length === 0) {
    return NextResponse.json({ error: "App not found" }, { status: 404 });
  }

  if (apps[0].user_id !== userId && !isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { name, tagline, description, url, github_url, image_url, tags } = body;

  await sql`
    UPDATE apps SET
      name = COALESCE(${name || null}, name),
      tagline = COALESCE(${tagline || null}, tagline),
      description = COALESCE(${description ?? null}, description),
      url = COALESCE(${url || null}, url),
      github_url = ${github_url ?? apps[0].github_url},
      image_url = ${image_url ?? apps[0].image_url},
      tags = COALESCE(${tags || null}, tags),
      updated_at = NOW()
    WHERE id = ${parseInt(id)}
  `;

  return NextResponse.json({ success: true });
}

// PATCH - Change app status (publish/unpublish)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const sql = getDb();

  const username = (session.user as any).username as string;
  const users = await sql`SELECT id, role FROM users WHERE username = ${username}`;
  if (users.length === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const userId = users[0].id as number;
  const isAdmin = users[0].role === "admin";

  const apps = await sql`SELECT * FROM apps WHERE id = ${parseInt(id)}`;
  if (apps.length === 0) {
    return NextResponse.json({ error: "App not found" }, { status: 404 });
  }

  if (apps[0].user_id !== userId && !isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { status } = await req.json();

  if (!["published", "unlisted"].includes(status)) {
    return NextResponse.json(
      { error: "Status must be 'published' or 'unlisted'" },
      { status: 400 }
    );
  }

  await sql`
    UPDATE apps SET status = ${status}, updated_at = NOW()
    WHERE id = ${parseInt(id)}
  `;

  return NextResponse.json({ success: true, status });
}

// DELETE - Delete an app (owner or admin)
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const sql = getDb();

  const username = (session.user as any).username as string;
  const users = await sql`SELECT id, role FROM users WHERE username = ${username}`;
  if (users.length === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const userId = users[0].id as number;
  const isAdmin = users[0].role === "admin";

  const apps = await sql`SELECT * FROM apps WHERE id = ${parseInt(id)}`;
  if (apps.length === 0) {
    return NextResponse.json({ error: "App not found" }, { status: 404 });
  }

  if (apps[0].user_id !== userId && !isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await sql`DELETE FROM apps WHERE id = ${parseInt(id)}`;

  return NextResponse.json({ success: true });
}

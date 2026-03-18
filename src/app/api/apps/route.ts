import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, tagline, description, url, github_url, image_url, tags } = body;

  if (!name || !tagline || !url) {
    return NextResponse.json(
      { error: "Name, tagline, and URL are required" },
      { status: 400 }
    );
  }

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const sql = getDb();

  // Get user id from session
  const username = (session.user as any).username as string;
  const users = await sql`SELECT id FROM users WHERE username = ${username}`;

  if (users.length === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const userId = users[0].id as number;

  // Check for duplicate slug
  const existing = await sql`SELECT id FROM apps WHERE slug = ${slug}`;
  const finalSlug = existing.length > 0 ? `${slug}-${Date.now()}` : slug;

  await sql`
    INSERT INTO apps (user_id, name, slug, tagline, description, url, github_url, image_url, tags)
    VALUES (${userId}, ${name}, ${finalSlug}, ${tagline}, ${description || ""}, ${url}, ${github_url || ""}, ${image_url || ""}, ${tags || []})
  `;

  return NextResponse.json({ slug: finalSlug });
}

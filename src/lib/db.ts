import { neon } from "@neondatabase/serverless";

export function getDb() {
  return neon(process.env.DATABASE_URL!);
}

export async function initDb() {
  const sql = getDb();

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      github_id INTEGER UNIQUE,
      google_id VARCHAR(255) UNIQUE,
      username VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255),
      email VARCHAR(255),
      avatar_url TEXT,
      bio TEXT,
      provider VARCHAR(50) DEFAULT 'github',
      created_at TIMESTAMP DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS apps (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      tagline VARCHAR(255) NOT NULL,
      description TEXT,
      url TEXT NOT NULL,
      github_url TEXT,
      image_url TEXT,
      tags TEXT[] DEFAULT '{}',
      status VARCHAR(50) DEFAULT 'published',
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `;

  return { success: true };
}

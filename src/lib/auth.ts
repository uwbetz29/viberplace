import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { getDb } from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const sql = getDb();

      if (account?.provider === "github") {
        const githubId = profile?.id as unknown as number;
        const username = profile?.login as unknown as string;

        await sql`
          INSERT INTO users (github_id, username, name, avatar_url, email, provider)
          VALUES (${githubId}, ${username}, ${user.name ?? username}, ${user.image ?? ""}, ${user.email ?? ""}, 'github')
          ON CONFLICT (github_id) DO UPDATE SET
            name = EXCLUDED.name,
            avatar_url = EXCLUDED.avatar_url,
            email = EXCLUDED.email
        `;
      } else if (account?.provider === "google") {
        const googleId = profile?.sub as string;
        // Create a username from the email (before @)
        const emailUsername = user.email?.split("@")[0] ?? "";
        // Check if this google user already exists
        const existing = await sql`
          SELECT id FROM users WHERE google_id = ${googleId}
        `;

        if (existing.length === 0) {
          // Check if username is taken, if so append a random suffix
          let username = emailUsername;
          const taken = await sql`SELECT id FROM users WHERE username = ${username}`;
          if (taken.length > 0) {
            username = `${emailUsername}${Math.floor(Math.random() * 9999)}`;
          }

          await sql`
            INSERT INTO users (google_id, username, name, avatar_url, email, provider)
            VALUES (${googleId}, ${username}, ${user.name ?? username}, ${user.image ?? ""}, ${user.email ?? ""}, 'google')
          `;
        } else {
          await sql`
            UPDATE users SET
              name = ${user.name ?? emailUsername},
              avatar_url = ${user.image ?? ""},
              email = ${user.email ?? ""}
            WHERE google_id = ${googleId}
          `;
        }
      }

      return true;
    },
    async session({ session }) {
      if (session.user) {
        const sql = getDb();
        // Look up user by email first, then fall back to name
        let rows = await sql`
          SELECT id, username FROM users WHERE email = ${session.user.email ?? ""}
        `;
        if (rows.length === 0) {
          rows = await sql`
            SELECT id, username FROM users WHERE name = ${session.user.name ?? ""}
          `;
        }
        if (rows.length > 0) {
          session.user.id = String(rows[0].id);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (session.user as any).username = rows[0].username;
        }
      }
      return session;
    },
  },
});

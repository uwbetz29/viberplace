import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { getDb } from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      const sql = getDb();
      const githubId = profile?.id as unknown as number;
      const username = profile?.login as unknown as string;

      await sql`
        INSERT INTO users (github_id, username, name, avatar_url)
        VALUES (${githubId}, ${username}, ${user.name ?? username}, ${user.image ?? ""})
        ON CONFLICT (github_id) DO UPDATE SET
          name = EXCLUDED.name,
          avatar_url = EXCLUDED.avatar_url
      `;

      return true;
    },
    async session({ session }) {
      if (session.user?.email) {
        const sql = getDb();
        const rows = await sql`
          SELECT id, username FROM users WHERE name = ${session.user.name}
        `;
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

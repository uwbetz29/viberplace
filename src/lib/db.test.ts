import { describe, it, expect, vi, beforeEach } from "vitest";

const mockSql = vi.fn();
vi.mock("@neondatabase/serverless", () => ({
  neon: vi.fn(() => mockSql),
}));

import { getDb, initDb } from "./db";

describe("db", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.DATABASE_URL = "postgresql://test:test@localhost/testdb";
  });

  describe("getDb", () => {
    it("returns a sql query function from neon", () => {
      const sql = getDb();
      expect(sql).toBeDefined();
      expect(typeof sql).toBe("function");
    });

    it("uses DATABASE_URL from environment", async () => {
      const { neon } = await import("@neondatabase/serverless");
      getDb();
      expect(neon).toHaveBeenCalledWith("postgresql://test:test@localhost/testdb");
    });
  });

  describe("initDb", () => {
    it("creates users and apps tables", async () => {
      mockSql.mockResolvedValue([]);
      const result = await initDb();
      expect(result).toEqual({ success: true });
      // Should be called twice: once for users table, once for apps table
      expect(mockSql).toHaveBeenCalledTimes(2);
    });

    it("returns success: true on completion", async () => {
      mockSql.mockResolvedValue([]);
      const result = await initDb();
      expect(result.success).toBe(true);
    });
  });
});

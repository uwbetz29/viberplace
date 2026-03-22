import { describe, it, expect, vi, beforeEach } from "vitest";

const mockSql = vi.fn();
const mockInitDb = vi.fn();

vi.mock("@/lib/db", () => ({
  initDb: () => mockInitDb(),
  getDb: () => mockSql,
}));

import { GET } from "./route";

describe("GET /api/init", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("initializes the database and returns success message", async () => {
    mockInitDb.mockResolvedValue({ success: true });
    mockSql.mockResolvedValue([]);

    const res = await GET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.message).toBe("Database initialized and migrated");
  });

  it("returns 500 when database initialization fails", async () => {
    mockInitDb.mockRejectedValue(new Error("Connection refused"));

    const res = await GET();
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toContain("Connection refused");
  });

  it("handles migration errors gracefully", async () => {
    mockInitDb.mockResolvedValue({ success: true });
    // Migrations can fail silently (caught internally)
    mockSql
      .mockRejectedValueOnce(new Error("column already nullable"))
      .mockRejectedValueOnce(new Error("column already exists"))
      .mockRejectedValueOnce(new Error("column already exists"))
      .mockRejectedValueOnce(new Error("column already exists"));

    const res = await GET();
    expect(res.status).toBe(200);
  });
});

import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock auth
const mockAuth = vi.fn();
vi.mock("@/lib/auth", () => ({
  auth: () => mockAuth(),
}));

// Mock db
const mockSql = vi.fn();
vi.mock("@/lib/db", () => ({
  getDb: () => mockSql,
}));

import { POST } from "./route";

function makeRequest(body: Record<string, unknown>): Request {
  return new Request("http://localhost:3000/api/apps", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/apps", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 when not authenticated", async () => {
    mockAuth.mockResolvedValue(null);
    const res = await POST(makeRequest({ name: "Test", tagline: "Test", url: "https://test.com" }));
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.error).toBe("Unauthorized");
  });

  it("returns 400 when required fields are missing", async () => {
    mockAuth.mockResolvedValue({ user: { id: "1", username: "testuser" } });

    // Missing name
    let res = await POST(makeRequest({ tagline: "Test", url: "https://test.com" }));
    expect(res.status).toBe(400);

    // Missing tagline
    res = await POST(makeRequest({ name: "Test", url: "https://test.com" }));
    expect(res.status).toBe(400);

    // Missing url
    res = await POST(makeRequest({ name: "Test", tagline: "Test" }));
    expect(res.status).toBe(400);
  });

  it("returns 404 when user is not found in database", async () => {
    mockAuth.mockResolvedValue({
      user: { id: "1", username: "ghostuser" },
    });
    mockSql.mockResolvedValueOnce([]); // user lookup returns empty

    const res = await POST(
      makeRequest({ name: "Test App", tagline: "A test", url: "https://test.com" })
    );
    expect(res.status).toBe(404);
    const body = await res.json();
    expect(body.error).toBe("User not found");
  });

  it("creates an app with a generated slug", async () => {
    mockAuth.mockResolvedValue({
      user: { id: "1", username: "testuser" },
    });
    mockSql
      .mockResolvedValueOnce([{ id: 42 }]) // user lookup
      .mockResolvedValueOnce([]) // slug check (no duplicate)
      .mockResolvedValueOnce([]); // insert

    const res = await POST(
      makeRequest({
        name: "My Cool App",
        tagline: "A cool app",
        url: "https://coolapp.com",
        github_url: "https://github.com/test/coolapp",
        tags: ["ai", "tool"],
      })
    );

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.slug).toBe("my-cool-app");
  });

  it("appends timestamp to slug when duplicate exists", async () => {
    mockAuth.mockResolvedValue({
      user: { id: "1", username: "testuser" },
    });
    mockSql
      .mockResolvedValueOnce([{ id: 42 }]) // user lookup
      .mockResolvedValueOnce([{ id: 1 }]) // slug check (duplicate found)
      .mockResolvedValueOnce([]); // insert

    const res = await POST(
      makeRequest({
        name: "My Cool App",
        tagline: "Another cool app",
        url: "https://coolapp2.com",
      })
    );

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.slug).toMatch(/^my-cool-app-\d+$/);
  });

  it("generates correct slugs from names with special characters", async () => {
    mockAuth.mockResolvedValue({
      user: { id: "1", username: "testuser" },
    });
    mockSql
      .mockResolvedValueOnce([{ id: 42 }])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);

    const res = await POST(
      makeRequest({
        name: "Hello World! @#$ Test",
        tagline: "Test",
        url: "https://test.com",
      })
    );

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.slug).toBe("hello-world-test");
  });

  it("handles optional fields being omitted", async () => {
    mockAuth.mockResolvedValue({
      user: { id: "1", username: "testuser" },
    });
    mockSql
      .mockResolvedValueOnce([{ id: 42 }])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);

    const res = await POST(
      makeRequest({
        name: "Minimal App",
        tagline: "Minimal",
        url: "https://minimal.com",
      })
    );

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.slug).toBe("minimal-app");
  });
});

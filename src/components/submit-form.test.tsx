import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SubmitForm } from "./submit-form";

// Mock next/navigation
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

// Mock global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("SubmitForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all form fields", () => {
    render(<SubmitForm />);
    expect(screen.getByPlaceholderText("My Cool App")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("A one-liner that describes your app")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tell people what your app does/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("https://myapp.vercel.app")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("https://github.com/you/your-app")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("https://example.com/screenshot.png")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("productivity, ai, tool")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<SubmitForm />);
    expect(screen.getByRole("button", { name: "Submit App" })).toBeInTheDocument();
  });

  it("shows required indicators for required fields", () => {
    render(<SubmitForm />);
    expect(screen.getByText("App Name *")).toBeInTheDocument();
    expect(screen.getByText("Tagline *")).toBeInTheDocument();
    expect(screen.getByText("App URL *")).toBeInTheDocument();
  });

  it("displays error message when submission fails", async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Name, tagline, and URL are required" }),
    });

    render(<SubmitForm />);

    await user.type(screen.getByPlaceholderText("My Cool App"), "Test");
    await user.type(screen.getByPlaceholderText("A one-liner that describes your app"), "Tagline");
    await user.type(screen.getByPlaceholderText("https://myapp.vercel.app"), "https://test.com");

    await user.click(screen.getByRole("button", { name: "Submit App" }));

    await waitFor(() => {
      expect(screen.getByText("Name, tagline, and URL are required")).toBeInTheDocument();
    });
  });

  it("redirects to app page on successful submission", async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ slug: "test-app" }),
    });

    render(<SubmitForm />);

    await user.type(screen.getByPlaceholderText("My Cool App"), "Test App");
    await user.type(screen.getByPlaceholderText("A one-liner that describes your app"), "A tagline");
    await user.type(screen.getByPlaceholderText("https://myapp.vercel.app"), "https://test.com");

    await user.click(screen.getByRole("button", { name: "Submit App" }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/apps/test-app");
    });
  });

  it("sends correct data to API", async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ slug: "my-app" }),
    });

    render(<SubmitForm />);

    await user.type(screen.getByPlaceholderText("My Cool App"), "My App");
    await user.type(screen.getByPlaceholderText("A one-liner that describes your app"), "Cool tagline");
    await user.type(screen.getByPlaceholderText("https://myapp.vercel.app"), "https://myapp.com");
    await user.type(screen.getByPlaceholderText("https://github.com/you/your-app"), "https://github.com/me/app");
    await user.type(screen.getByPlaceholderText("productivity, ai, tool"), "ai, tool");

    await user.click(screen.getByRole("button", { name: "Submit App" }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith("/api/apps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: expect.any(String),
      });
    });

    const sentBody = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(sentBody.name).toBe("My App");
    expect(sentBody.tagline).toBe("Cool tagline");
    expect(sentBody.url).toBe("https://myapp.com");
    expect(sentBody.github_url).toBe("https://github.com/me/app");
    expect(sentBody.tags).toEqual(["ai", "tool"]);
  });

  it("shows Submitting... text while submitting", async () => {
    const user = userEvent.setup();
    let resolvePromise: (value: unknown) => void;
    mockFetch.mockReturnValue(
      new Promise((resolve) => {
        resolvePromise = resolve;
      })
    );

    render(<SubmitForm />);

    await user.type(screen.getByPlaceholderText("My Cool App"), "Test");
    await user.type(screen.getByPlaceholderText("A one-liner that describes your app"), "Tag");
    await user.type(screen.getByPlaceholderText("https://myapp.vercel.app"), "https://t.com");

    await user.click(screen.getByRole("button", { name: "Submit App" }));

    await waitFor(() => {
      expect(screen.getByText("Submitting...")).toBeInTheDocument();
    });

    // Cleanup
    resolvePromise!({ ok: true, json: async () => ({ slug: "test" }) });
  });

  it("displays fallback error when API returns no error message", async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValue({
      ok: false,
      json: async () => ({}),
    });

    render(<SubmitForm />);

    await user.type(screen.getByPlaceholderText("My Cool App"), "Test");
    await user.type(screen.getByPlaceholderText("A one-liner that describes your app"), "Tag");
    await user.type(screen.getByPlaceholderText("https://myapp.vercel.app"), "https://t.com");

    await user.click(screen.getByRole("button", { name: "Submit App" }));

    await waitFor(() => {
      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    });
  });
});

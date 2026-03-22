import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

// Mock next/link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("Home Page", () => {
  it("renders the hero heading", () => {
    render(<Home />);
    expect(screen.getByText(/The home for/)).toBeInTheDocument();
    expect(screen.getByText("vibe-coded")).toBeInTheDocument();
  });

  it("renders the hero description", () => {
    render(<Home />);
    expect(
      screen.getByText(/Built something cool with Claude Code/i)
    ).toBeInTheDocument();
  });

  it("renders Browse Apps link", () => {
    render(<Home />);
    const link = screen.getByRole("link", { name: /Browse Apps/ });
    expect(link).toHaveAttribute("href", "/apps");
  });

  it("renders Submit App link", () => {
    render(<Home />);
    const link = screen.getByRole("link", { name: /Submit App/ });
    expect(link).toHaveAttribute("href", "/submit");
  });

  it("renders Get Started link", () => {
    render(<Home />);
    const link = screen.getByRole("link", { name: /Get Started/ });
    expect(link).toHaveAttribute("href", "/get-started");
  });

  it("renders the three-step process", () => {
    render(<Home />);
    expect(screen.getByText("Build with AI")).toBeInTheDocument();
    expect(screen.getByText("Submit it")).toBeInTheDocument();
    expect(screen.getByText("Get discovered")).toBeInTheDocument();
  });

  it("renders the footer", () => {
    render(<Home />);
    expect(
      screen.getByText(/Viberplace — where vibe-coded apps find their people/)
    ).toBeInTheDocument();
  });
});

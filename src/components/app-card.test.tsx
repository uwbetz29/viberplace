import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { AppCard } from "./app-card";

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

const defaultProps = {
  id: 1,
  name: "Test App",
  slug: "test-app",
  tagline: "A test application",
  image_url: null,
  tags: [],
  username: "testuser",
  avatar_url: null,
};

describe("AppCard", () => {
  it("renders the app name and tagline", () => {
    render(<AppCard {...defaultProps} />);
    expect(screen.getByText("Test App")).toBeInTheDocument();
    expect(screen.getByText("A test application")).toBeInTheDocument();
  });

  it("links to the correct app detail page", () => {
    render(<AppCard {...defaultProps} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/apps/test-app");
  });

  it("displays the username", () => {
    render(<AppCard {...defaultProps} />);
    expect(screen.getByText("testuser")).toBeInTheDocument();
  });

  it("shows first letter when no image_url is provided", () => {
    render(<AppCard {...defaultProps} />);
    expect(screen.getByText("T")).toBeInTheDocument();
  });

  it("renders the image when image_url is provided", () => {
    render(<AppCard {...defaultProps} image_url="https://example.com/img.png" />);
    const img = screen.getByAltText("Test App");
    expect(img).toHaveAttribute("src", "https://example.com/img.png");
  });

  it("displays avatar when avatar_url is provided", () => {
    render(<AppCard {...defaultProps} avatar_url="https://example.com/avatar.png" />);
    // Avatar has alt="" so it's role="presentation"
    const avatar = document.querySelector('img[src="https://example.com/avatar.png"]');
    expect(avatar).toBeInTheDocument();
  });

  it("displays the first tag when tags are provided", () => {
    render(<AppCard {...defaultProps} tags={["ai", "tool", "productivity"]} />);
    expect(screen.getByText("ai")).toBeInTheDocument();
  });

  it("does not display tag badge when tags array is empty", () => {
    render(<AppCard {...defaultProps} tags={[]} />);
    expect(screen.queryByText("ai")).not.toBeInTheDocument();
  });
});

// Shared site details for the footer, the legal pages and the 404 page.

// TODO: replace with the real Obsidx profile URLs and inbox before launch.
export const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Twitter", href: "https://twitter.com/" },
] as const;

export const contactEmail = "hello@obsidx.com";

export const siteUrl = "obsidx.com";

// Shown as "Last updated" on /privacy and /terms. Change it whenever either page changes.
export const legalUpdated = { label: "10 November 2026", iso: "2026-11-10" };

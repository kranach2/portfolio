// The site-wide link-preview image, drawn at build time in the Work page's
// look: Satori lays out the card with the site's own fonts, sharp makes it a PNG.
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { APIRoute } from "astro";
import satori from "satori";
import sharp from "sharp";
import { getProfile } from "../lib/content";

const width = 1200;
const height = 630;

// Fontsource's package exports expose only CSS, so read the files directly.
const font = (pkg: string, file: string) =>
  readFile(join(process.cwd(), "node_modules/@fontsource", pkg, "files", file));

// A minimal element tree for Satori, which takes React-shaped objects.
const el = (type: string, style: Record<string, unknown>, children: unknown) => ({
  type,
  props: { style, children },
});

export const GET: APIRoute = async () => {
  const profile = await getProfile();
  const card = el(
    "div",
    {
      width,
      height,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "0 96px",
      background: "#f6f3ee",
      color: "#1c1917",
      fontFamily: "Inter",
    },
    [
      el(
        "div",
        { fontSize: 26, letterSpacing: "0.2em", textTransform: "uppercase", color: "#78716c" },
        profile.location,
      ),
      el(
        "div",
        { marginTop: 28, fontFamily: "Instrument Serif", fontSize: 120, lineHeight: 1.05 },
        profile.name,
      ),
      el(
        "div",
        { marginTop: 20, fontFamily: "Instrument Serif", fontStyle: "italic", fontSize: 72, color: "#a0522d" },
        profile.headline,
      ),
    ],
  );

  const svg = await satori(card as Parameters<typeof satori>[0], {
    width,
    height,
    fonts: [
      { name: "Inter", data: await font("inter", "inter-latin-400-normal.woff"), weight: 400 },
      {
        name: "Instrument Serif",
        data: await font("instrument-serif", "instrument-serif-latin-400-normal.woff"),
        weight: 400,
        style: "normal",
      },
      {
        name: "Instrument Serif",
        data: await font("instrument-serif", "instrument-serif-latin-400-italic.woff"),
        weight: 400,
        style: "italic",
      },
    ],
  });
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};

import { existsSync } from "node:fs";
import path from "node:path";
import { Reveal } from "@/components/Reveal";

// Drop a logo into public/tools/ named after the slug (svg, png or webp) and it replaces the text placeholder.
// Two strips with no tool in common: each logo appears in exactly one of them.
const topRow = [
  { slug: "whop", name: "Whop" },
  { slug: "notion", name: "Notion" },
  { slug: "make", name: "Make" },
  { slug: "vercel", name: "Vercel" },
  { slug: "supabase", name: "Supabase" },
] as const;

const bottomRow = [
  { slug: "creem", name: "Creem.io" },
  { slug: "canva", name: "Canva" },
  { slug: "claude", name: "Claude" },
  { slug: "chatgpt", name: "ChatGPT" },
  { slug: "figma", name: "Figma" },
] as const;

const logoDir = path.join(process.cwd(), "public", "tools");

function findLogo(slug: string) {
  const ext = ["svg", "png", "webp"].find((type) => existsSync(path.join(logoDir, `${slug}.${type}`)));
  return ext ? `/tools/${slug}.${ext}` : null;
}

type Tool = { slug: string; name: string; logo: string | null };

const withLogos = (row: readonly { slug: string; name: string }[]): Tool[] =>
  row.map((tool) => ({ ...tool, logo: findLogo(tool.slug) }));

// One looping strip. The track holds two copies of the list so the -50% loop is seamless; only
// the first copy is announced. Each logo gets a fixed slot of at least a quarter of the strip
// (see .tools-list li), which is what keeps the same logo from showing twice in a strip at once.
function ToolsRow({ items, reverse = false }: { items: Tool[]; reverse?: boolean }) {
  return (
    <div className={`tools-marquee${reverse ? " tools-marquee--reverse" : ""}`}>
      <div className="tools-track">
        {[0, 1].map((copy) => (
          <ul className="tools-list" aria-hidden={copy === 1} key={copy}>
            {items.map((tool) => (
              <li className={`tools-item--${tool.slug}`} key={tool.slug}>
                {tool.logo
                  // eslint-disable-next-line @next/next/no-img-element -- logos are small, unknown-size brand files
                  ? <img src={tool.logo} alt={copy === 1 ? "" : tool.name} loading="lazy" />
                  : <span>{tool.name}</span>}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function ToolsMarquee() {
  return (
    <section className="tools-rail" aria-labelledby="tools-rail-title">
      <Reveal>
        <h2 className="tools-rail-title" id="tools-rail-title">Tools in Our Workflow</h2>
      </Reveal>
      {/* Two strips with different tools, running in opposite directions. Focus pauses both. */}
      <div className="tools-band" tabIndex={0} aria-label="Tools in our workflow. Hover or focus to pause.">
        <ToolsRow items={withLogos(topRow)} />
        <ToolsRow items={withLogos(bottomRow)} reverse />
      </div>
    </section>
  );
}

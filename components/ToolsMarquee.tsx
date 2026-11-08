import { existsSync } from "node:fs";
import path from "node:path";
import { Reveal } from "@/components/Reveal";

// Drop a logo into public/tools/ named after the slug (svg, png or webp) and it replaces the text placeholder.
const tools = [
  { slug: "whop", name: "Whop" },
  { slug: "notion", name: "Notion" },
  { slug: "make", name: "Make" },
  { slug: "vercel", name: "Vercel" },
  { slug: "supabase", name: "Supabase" },
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

type Tool = (typeof tools)[number] & { logo: string | null };

// One looping strip; the track holds two copies so the -50% loop is seamless.
function ToolsRow({ items, reverse = false }: { items: Tool[]; reverse?: boolean }) {
  return (
    <div
      className={`tools-marquee${reverse ? " tools-marquee--reverse" : ""}`}
      // The second row repeats the first in a new order, so only the first is announced and focusable.
      {...(reverse
        ? { "aria-hidden": true }
        : { tabIndex: 0, "aria-label": "Tools in our workflow. Hover or focus to pause." })}
    >
      <div className="tools-track">
        {[0, 1].map((copy) => (
          <ul className="tools-list" aria-hidden={reverse || copy === 1} key={copy}>
            {items.map((tool) => (
              <li className={`tools-item--${tool.slug}`} key={tool.slug}>
                {tool.logo
                  // eslint-disable-next-line @next/next/no-img-element -- logos are small, unknown-size brand files
                  ? <img src={tool.logo} alt={reverse ? "" : tool.name} loading="lazy" />
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
  const items: Tool[] = tools.map((tool) => ({ ...tool, logo: findLogo(tool.slug) }));
  // Second row starts halfway through the list so the two rows never line up.
  const half = Math.ceil(items.length / 2);
  const shifted = [...items.slice(half), ...items.slice(0, half)];

  return (
    <section className="tools-rail" aria-labelledby="tools-rail-title">
      <Reveal>
        <h2 className="tools-rail-title" id="tools-rail-title">Tools in Our Workflow</h2>
      </Reveal>
      {/* Two strips running in opposite directions. */}
      <div className="tools-band">
        <ToolsRow items={items} />
        <ToolsRow items={shifted} reverse />
      </div>
    </section>
  );
}

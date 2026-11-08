import { existsSync } from "node:fs";
import path from "node:path";

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

export function ToolsMarquee() {
  const items = tools.map((tool) => ({ ...tool, logo: findLogo(tool.slug) }));

  return (
    <section className="tools-rail" aria-labelledby="tools-rail-title">
      <h2 className="tools-rail-title" id="tools-rail-title">Tools in Our Workflow</h2>
      <div className="tools-band">
        <div className="tools-marquee" tabIndex={0} aria-label="Tools in our workflow. Hover or focus to pause.">
          <div className="tools-track">
            {[0, 1].map((copy) => (
              <ul className="tools-list" aria-hidden={copy === 1} key={copy}>
                {items.map((tool) => (
                  <li className={`tools-item--${tool.slug}`} key={tool.slug}>
                    {tool.logo
                      // eslint-disable-next-line @next/next/no-img-element -- logos are small, unknown-size brand files
                      ? <img src={tool.logo} alt={tool.name} loading="lazy" />
                      : <span>{tool.name}</span>}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

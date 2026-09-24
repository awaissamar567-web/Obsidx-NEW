import Image from "next/image";

export function BrandLogo({ priority = false }: { priority?: boolean }) {
  return (
    <Image
      className="brand-logo-image"
      src="/assets/obsidx-logo.png"
      alt="Obsidx"
      width={52}
      height={52}
      loading="eager"
      priority={priority}
    />
  );
}

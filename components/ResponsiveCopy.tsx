export function ResponsiveCopy({ full, short }: { full: string; short: string }) {
  return <><span className="desktop-copy">{full}</span><span className="mobile-copy">{short}</span></>;
}

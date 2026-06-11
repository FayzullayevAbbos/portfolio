import { cn } from "@/lib/utils";

// Renders an array of paragraphs as justified, readable academic prose.
export function Prose({
  paragraphs,
  className,
}: {
  paragraphs: string[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl space-y-4 text-[15px] leading-[1.85] text-foreground/85 [text-align:justify]",
        className,
      )}
    >
      {paragraphs.map((text, i) => (
        <p key={i} className="indent-8">
          {text}
        </p>
      ))}
    </div>
  );
}

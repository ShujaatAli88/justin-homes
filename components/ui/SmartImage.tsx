import Image from "next/image";
import { cn, isPlaceholder } from "@/lib/utils";

interface SmartImageProps {
  src: string | undefined;
  alt: string;
  label?: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
}

/**
 * Renders a real image when `src` is a real path, or a clearly-labeled
 * placeholder box when it's still a `{{TOKEN}}` awaiting client content.
 * Keeps every page visually complete before real assets exist.
 */
export function SmartImage({ src, alt, label, className, fill = true, sizes, priority }: SmartImageProps) {
  if (isPlaceholder(src)) {
    return (
      <div
        className={cn(
          "flex items-center justify-center border border-dashed border-gray-400 bg-gray-100 text-center text-xs text-gray-600",
          fill ? "absolute inset-0" : "aspect-[4/3] w-full",
          className
        )}
        role="img"
        aria-label={label ?? alt}
      >
        <span className="px-3">{label ?? alt}</span>
      </div>
    );
  }

  return (
    <Image
      src={src as string}
      alt={alt}
      fill={fill}
      sizes={sizes}
      priority={priority}
      className={cn("object-cover", className)}
    />
  );
}

export type StatIconType = "bed" | "bath" | "sqft" | "acres";

export const statTint: Record<StatIconType, { bg: string; ring: string; icon: string }> = {
  bed: { bg: "bg-rose-50", ring: "ring-rose-100", icon: "text-kw-red" },
  bath: { bg: "bg-sky-50", ring: "ring-sky-100", icon: "text-sky-600" },
  sqft: { bg: "bg-amber-50", ring: "ring-amber-100", icon: "text-amber-600" },
  acres: { bg: "bg-emerald-50", ring: "ring-emerald-100", icon: "text-emerald-600" },
};

export function StatIcon({ type, className = "h-4 w-4" }: { type: StatIconType; className?: string }) {
  if (type === "bed") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 19v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
        <path d="M3 19v2M21 19v2" />
        <path d="M5 11V8a2 2 0 0 1 2-2h3v5" />
        <path d="M13 11V6h4a2 2 0 0 1 2 2v3" />
      </svg>
    );
  }
  if (type === "bath") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z" />
        <path d="M7 12V6a2 2 0 0 1 3.2-1.6" />
        <path d="M4 19v2M18 19v2" />
      </svg>
    );
  }
  if (type === "acres") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 20h18" />
        <path d="M5 20V10l7-6 7 6v10" />
        <path d="M9 20v-6h6v6" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
    </svg>
  );
}

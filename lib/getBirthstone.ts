import { birthstones } from "@/data/birthstones";

export function getBirthstone(date: string | Date) {
  const parsed = typeof date === "string" ? new Date(`${date}T00:00:00`) : date;
  const month = parsed.getMonth() + 1;

  if (!month || Number.isNaN(month)) return null;
  return birthstones.find((item) => item.month === month) ?? null;
}

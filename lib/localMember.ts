"use client";

export type LocalMember = {
  email: string;
  fullName?: string;
  plan: "free";
  newsletterOptIn: boolean;
  createdAt: string;
};

const MEMBER_KEY = "litho:member";
const USAGE_KEY = "litho:usage";
const FAVORITES_KEY = "litho:favorites";

export function saveLocalMember(member: Omit<LocalMember, "plan" | "createdAt">) {
  const next: LocalMember = {
    ...member,
    plan: "free",
    createdAt: new Date().toISOString()
  };
  window.localStorage.setItem(MEMBER_KEY, JSON.stringify(next));
  return next;
}

export function getLocalMember() {
  try {
    const raw = window.localStorage.getItem(MEMBER_KEY);
    return raw ? (JSON.parse(raw) as LocalMember) : null;
  } catch {
    return null;
  }
}

export function clearLocalMember() {
  window.localStorage.removeItem(MEMBER_KEY);
}

export function getLocalFavorites() {
  try {
    return JSON.parse(window.localStorage.getItem(FAVORITES_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

export function getLocalRecommendationUsage() {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const raw = window.localStorage.getItem(USAGE_KEY);
    const usage = raw ? (JSON.parse(raw) as { date: string; recommendations: number }) : null;
    if (!usage || usage.date !== today) return { date: today, recommendations: 0, remaining: 3 };
    return { ...usage, remaining: Math.max(0, 3 - usage.recommendations) };
  } catch {
    return { date: new Date().toISOString().slice(0, 10), recommendations: 0, remaining: 3 };
  }
}

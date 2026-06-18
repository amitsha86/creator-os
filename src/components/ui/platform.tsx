import type { Platform } from "@/lib/data";
import { Youtube, Instagram, Linkedin, Facebook, Music2, Hash } from "lucide-react";

const map: Record<Platform, { Icon: any; color: string; label: string }> = {
  youtube: { Icon: Youtube, color: "#ef4444", label: "YouTube" },
  instagram: { Icon: Instagram, color: "#ec4899", label: "Instagram" },
  tiktok: { Icon: Music2, color: "#22d3ee", label: "TikTok" },
  linkedin: { Icon: Linkedin, color: "#0ea5e9", label: "LinkedIn" },
  x: { Icon: Hash, color: "#9aa1ad", label: "X" },
  facebook: { Icon: Facebook, color: "#3b82f6", label: "Facebook" },
};

export function PlatformIcon({ platform, size = 16 }: { platform: Platform; size?: number }) {
  const { Icon, color } = map[platform];
  return <Icon size={size} style={{ color }} />;
}

export function platformLabel(p: Platform) {
  return map[p].label;
}
export function platformColor(p: Platform) {
  return map[p].color;
}

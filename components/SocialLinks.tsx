import { IconBrandFacebook, IconBrandInstagram, IconBrandWhatsapp } from "@tabler/icons-react";
import { SITE } from "@/lib/site";

export const SOCIALS = [
  { href: SITE.instagram, label: "Instagram", Icon: IconBrandInstagram },
  { href: SITE.facebook, label: "Facebook", Icon: IconBrandFacebook },
  {
    href: `https://wa.me/${SITE.whatsappNumber}`,
    label: "WhatsApp",
    Icon: IconBrandWhatsapp,
  },
] as const;

export default function SocialLinks({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "md" | "lg";
}) {
  const box = size === "lg" ? "h-12 w-12" : "h-9 w-9";
  const icon = size === "lg" ? 26 : 20;
  return (
    <ul className={`flex items-center gap-2.5 ${className}`}>
      {SOCIALS.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Fresh Noodles on ${label}`}
            className={`pressable flex ${box} items-center justify-center rounded-full border border-line text-ink transition-colors duration-200 hover:border-gold hover:bg-gold hover:text-gold-ink`}
          >
            <Icon size={icon} stroke={1.75} aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}

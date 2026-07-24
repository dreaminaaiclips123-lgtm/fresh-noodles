// Sourced from Fresh Noodles' Facebook page (facebook.com/profile.php?id=61563865457433)
// and corrections from the owner.
export const SITE = {
  name: "Fresh Noodles",
  shortName: "FN",
  tagline: "Asia closer than ever.",
  phoneDisplay: "010 4057 0788",
  // Egypt mobile numbers are 010/011/012/015 + 8 digits; country code +20 drops the leading 0.
  whatsappNumber: "201040570788",
  instagram:
    "https://www.instagram.com/freshnoodles.eg?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  facebook: "https://www.facebook.com/profile.php?id=61563865457433",
  // No posted hours per branch — plausible delivery window, flagged in
  // PRODUCT.md for the owner to confirm/correct.
  hours: "12:00 PM – 1:00 AM, daily",
} as const;

export type Branch = {
  id: string;
  name: string;
  area: string;
};

export const BRANCHES: Branch[] = [
  { id: "agora-mall", name: "Agora Mall", area: "New Cairo, Egypt" },
  { id: "arabella-plaza", name: "Arabella Plaza", area: "New Cairo, Egypt" },
];

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-line px-5 py-8 sm:px-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2.5 text-ink">
          <Image
            src="/brand/logo.jpg"
            alt="Fresh Noodles logo"
            width={28}
            height={28}
            className="h-7 w-7 rounded-full border border-line"
          />
          <span className="font-display text-sm tracking-wide">
            FRESH NOODLES
          </span>
        </div>
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} — Asian food, made fresh in Egypt.
        </p>
        <p className="text-sm text-muted">Demo site · Not the official website</p>
      </div>
    </footer>
  );
}

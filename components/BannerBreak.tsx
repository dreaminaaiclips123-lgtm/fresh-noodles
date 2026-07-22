import Image from "next/image";

export default function BannerBreak() {
  return (
    <div className="relative h-72 w-full overflow-hidden sm:h-96">
      <Image
        src="/menu/banner-spread-clean.jpg"
        alt="A spread of Fresh Noodles dishes: beef, chicken stir-fry, wings, spring rolls and dumplings"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/70 via-bg/10 to-bg/70" />
    </div>
  );
}

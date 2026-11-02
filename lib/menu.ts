export type MenuOption = {
  label: string;
  choices: string[];
  /** Choose this many in any mix (e.g. 3 baos), instead of exactly one. */
  pick?: number;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  /** What's actually charged (Talabat's discounted price). */
  price: number;
  /** Crossed-out reference price, shown above the real price — matches Talabat. */
  originalPrice: number;
  spicy?: 1 | 2 | 3;
  tag?: "SIGNATURE" | "BESTSELLER" | "SPICY";
  /** Has a real matching photo — shown as a tile on the homepage menu. */
  featured?: boolean;
  image?: string;
  /** e.g. choice of rice or noodles — one selector each, shown before adding to cart. */
  options?: MenuOption[];
};

export type MenuCategory = {
  id: string;
  title: string;
  items: MenuItem[];
};

// Prices are synced from Fresh Noodles' Talabat listing by
// scripts/sync-talabat.mjs: originalPrice mirrors Talabat's original, and
// price applies Talabat's discount plus EXTRA_PERCENT points (see the script).
export const MENU: MenuCategory[] = [
  {
    id: "combos",
    title: "Combos & Bundles",
    items: [
      {
        id: "noodles-combo-offer",
        name: "Noodles Combo Offer",
        description: "Noodles, salad, appetizers and a drink.",
        originalPrice: 700,
        price: 490,
        image: "/menu/noodles-combo-offer.jpg",
      },
      {
        id: "special-combo-offer",
        name: "Special Combo Offer",
        description: "Main course, side dish, salad, appetizer, and drink.",
        originalPrice: 800,
        price: 560,
        image: "/menu/special-combo-offer.jpg",
      },
      {
        id: "bao-combo-offer",
        name: "Bao Combo Offer",
        description: "Any 3 baos (shrimp, chicken katsu, or beef bulgogi), Teriyaki Fries and a drink.",
        originalPrice: 425,
        price: 298,
        image: "/menu/bao-combo-offer.jpg",
      },
      {
        id: "sweet-sour-chicken-bundle",
        name: "Sweet & Sour Chicken Bundle",
        description:
          "Sweet & sour chicken dish, served with vegetables and salad.",
        originalPrice: 650,
        price: 455,
        options: [{ label: "Side", choices: ["Rice", "Noodles"] }],
        image: "/menu/sweet-sour-chicken-bundle.jpg",
      },
      {
        id: "beef-black-pepper-bundle",
        name: "Beef with Black Pepper Bundle",
        description: "Black pepper beef dish with teriyaki potatoes and a drink.",
        originalPrice: 715,
        price: 500,
        image: "/menu/beef-black-pepper-bundle.jpg",
      },
    ],
  },
  {
    id: "soup",
    title: "Soup",
    items: [
      {
        id: "korean-beef-ramen-kimchi",
        name: "Korean Beef Ramen with Kimchi",
        description: "Korean ramen noodle soup with beef, vegetables, and kimchi.",
        originalPrice: 430,
        price: 301,
        featured: true,
        image: "/menu/korean-beef-ramen.jpg",
      },
      {
        id: "chicken-ramen-soup",
        name: "Chicken Ramen Soup",
        description: "Chicken ramen soup with vegetables and egg.",
        originalPrice: 425,
        price: 298,
        image: "/menu/chicken-ramen-soup.jpg",
      },
      {
        id: "tom-yum-shrimp-soup",
        name: "Tom Yum Shrimp Soup",
        description: "Spicy Thai soup with shrimp, mushrooms, and chili peppers.",
        originalPrice: 415,
        price: 291,
        spicy: 2,
        image: "/menu/tom-yum-shrimp-soup.jpg",
      },
      {
        id: "chicken-laksa-soup",
        name: "Chicken Laksa Soup",
        description: "Malaysian glass noodle soup with chicken and vegetables.",
        originalPrice: 435,
        price: 305,
        image: "/menu/chicken-laksa-soup.jpg",
      },
      {
        id: "laksa-shrimp-soup",
        name: "Laksa Shrimp Soup",
        description: "Malaysian noodle soup with shrimp and vegetables.",
        originalPrice: 445,
        price: 312,
        image: "/menu/laksa-shrimp-soup.jpg",
      },
    ],
  },
  {
    id: "appetizers",
    title: "Appetizers",
    items: [
      {
        id: "chinese-vegetable-spring-roll",
        name: "Chinese Vegetable Spring Roll",
        description:
          "Crispy vegetable spring roll with carrots, glass noodles, cabbage, and green onions, Chinese style.",
        originalPrice: 180,
        price: 126,
        featured: true,
        image: "/menu/spring-rolls.jpg",
      },
      {
        id: "spicy-dynamite-chicken",
        name: "Spicy Dynamite Chicken",
        description:
          "Crispy chicken pieces covered with our special spicy dynamite sauce, served hot.",
        originalPrice: 295,
        price: 207,
        spicy: 1,
        tag: "SPICY",
        featured: true,
        image: "/menu/dynamite-chicken.jpg",
      },
      {
        id: "beef-gyoza",
        name: "Beef Gyoza",
        description:
          "Fresh beef gyoza stuffed with minced meat and selected spices, served with a tangy spicy Spanish sauce and fermented kimchi.",
        originalPrice: 320,
        price: 224,
        spicy: 1,
        image: "/menu/beef-gyoza.jpg",
      },
      {
        id: "chicken-gyoza",
        name: "Chicken Gyoza",
        description: "Dumplings stuffed with chicken, covered with a spicy chili paste sauce.",
        originalPrice: 375,
        price: 263,
        spicy: 1,
        image: "/menu/chicken-gyoza.jpg",
      },
      {
        id: "shrimp-gyoza",
        name: "Shrimp Gyoza",
        description: "Dumplings stuffed with shrimp, served with ponzu sauce.",
        originalPrice: 385,
        price: 270,
        image: "/menu/shrimp-gyoza.jpg",
      },
      {
        id: "shrimp-dynamite",
        name: "Shrimp Dynamite",
        description:
          "Fried shrimp in tempura batter with a spicy mayonnaise-sriracha sauce.",
        originalPrice: 370,
        price: 259,
        spicy: 1,
        image: "/menu/shrimp-dynamite.jpg",
      },
      {
        id: "teriyaki-fries",
        name: "Teriyaki Fries",
        description: "French fries topped with teriyaki mayonnaise sauce.",
        originalPrice: 200,
        price: 140,
        image: "/menu/teriyaki-fries.jpg",
      },
    ],
  },
  {
    id: "main-dishes",
    title: "Main Course",
    items: [
      {
        id: "sweet-and-sour-chicken",
        name: "Sweet and Sour Chicken",
        description: "Chicken pieces cooked in sweet and sour sauce.",
        originalPrice: 480,
        price: 336,
        tag: "BESTSELLER",
        featured: true,
        image: "/menu/sweet-sour-chicken.jpg",
      },
      {
        id: "black-pepper-beef",
        name: "Black Pepper Beef",
        description: "Sliced beef cooked with black pepper sauce.",
        originalPrice: 440,
        price: 308,
        featured: true,
        image: "/menu/black-pepper-beef.jpg",
      },
      {
        id: "shrimp-teriyaki-sauce",
        name: "Shrimp with Teriyaki Sauce",
        description: "Fried shrimp with teriyaki sauce, mushrooms, peppers, and onions.",
        originalPrice: 520,
        price: 364,
        image: "/menu/shrimp-teriyaki-sauce.jpg",
      },
      {
        id: "teriyaki-chicken",
        name: "Teriyaki Chicken",
        description:
          "Tender chicken cooked in a rich teriyaki sauce with bell peppers, onions, and mushrooms.",
        originalPrice: 485,
        price: 340,
        image: "/menu/teriyaki-chicken.jpg",
      },
      {
        id: "spicy-szechuan-chicken",
        name: "Spicy Szechuan Chicken",
        description: "Chicken cooked with spicy Szechuan paste.",
        originalPrice: 475,
        price: 333,
        spicy: 2,
        image: "/menu/spicy-szechuan-chicken.jpg",
      },
      {
        id: "sichuan-spicy-shrimp",
        name: "Sichuan Sauce Hot Shrimp",
        description: "Shrimp cooked in a spicy Sichuan-style sauce.",
        originalPrice: 440,
        price: 308,
        spicy: 2,
        image: "/menu/sichuan-spicy-shrimp.jpg",
      },
      {
        id: "sweet-and-sour-shrimp",
        name: "Sweet and Sour Shrimp",
        description: "Shrimp cooked in a sweet and sour sauce.",
        originalPrice: 530,
        price: 371,
        image: "/menu/sweet-and-sour-shrimp.jpg",
      },
      {
        id: "indian-chicken-curry",
        name: "Indian Chicken Curry",
        description:
          "Our signature Indian chicken curry, prepared with milk, onions, hot red peppers, and a blend of authentic Indian spices.",
        originalPrice: 465,
        price: 326,
        spicy: 1,
        image: "/menu/indian-chicken-curry.jpg",
      },
    ],
  },
  {
    id: "drinks",
    title: "Drinks",
    items: [
      {
        id: "water",
        name: "Water",
        description: "Bottled water.",
        originalPrice: 20,
        price: 20,
      },
      {
        id: "v-cola",
        name: "Fi Cola",
        description: "Carbonated soft drink.",
        originalPrice: 35,
        price: 35,
      },
      {
        id: "7-up",
        name: "7 UP",
        description: "Lemon-lime flavored soft drink.",
        originalPrice: 35,
        price: 35,
      },
    ],
  },
  {
    id: "noodles",
    title: "Noodles",
    items: [
      {
        id: "spicy-korean-bulgogi-beef",
        name: "Spicy Korean Bulgogi Beef",
        description:
          "Korean-style marinated beef served with noodles, spicy Korean kimchi, and spicy sauce.",
        originalPrice: 530,
        price: 371,
        spicy: 1,
        tag: "SIGNATURE",
        featured: true,
        image: "/menu/bulgogi-noodles.jpg",
      },
      {
        id: "chicken-udon-noodles",
        name: "Chicken Udon Noodles",
        description:
          "Tender chicken udon noodles stir-fried with crispy fried chicken pieces, bell peppers, onions, and aromatic spices in a savory sauce.",
        originalPrice: 470,
        price: 470,
        featured: true,
        image: "/menu/chicken-udon-noodles.jpg",
      },
      {
        id: "chicken-ramen-buldak",
        name: "Chicken Ramen with Spicy Korean Buldak Sauce",
        description: "Handmade ramen with spicy Korean buldak sauce.",
        originalPrice: 440,
        price: 308,
        spicy: 2,
        image: "/menu/chicken-ramen-buldak.jpg",
      },
      {
        id: "japanese-curry-chicken-ramen",
        name: "Japanese Curry Chicken Ramen",
        description:
          "Handmade ramen soup with chicken slices in authentic Japanese curry sauce, served with kimchi, sprouts, and fresh spinach.",
        originalPrice: 450,
        price: 315,
        image: "/menu/japanese-curry-chicken-ramen.jpg",
      },
      {
        id: "fresh-vegetable-noodles",
        name: "Fresh Vegetable Noodles",
        description: "Fried noodles with fresh vegetables.",
        originalPrice: 250,
        price: 175,
        image: "/menu/fresh-vegetable-noodles.jpg",
      },
      {
        id: "spicy-shrimp-noodles",
        name: "Spicy Shrimp Noodles",
        description: "Fried noodles with shrimp and butter in a spicy sauce.",
        originalPrice: 550,
        price: 385,
        spicy: 2,
        image: "/menu/spicy-shrimp-noodles.jpg",
      },
    ],
  },
  {
    id: "pao",
    title: "Pao",
    items: [
      {
        id: "beef-bulgogi-bao",
        name: "Beef Bulgogi Bao",
        description: "Bao bun filled with Korean-style bulgogi beef.",
        originalPrice: 130,
        price: 91,
        image: "/menu/beef-bulgogi-bao.jpg",
      },
      {
        id: "chicken-katsu-bao",
        name: "Chicken Katsu Bao",
        description: "Bao bun filled with chicken and katsu sauce.",
        originalPrice: 130,
        price: 91,
        image: "/menu/chicken-katsu-bao.jpg",
      },
      {
        id: "dynamite-bao-shrimp",
        name: "Dynamite Bao with Shrimp",
        description: "Bao bun stuffed with dynamite shrimp.",
        originalPrice: 130,
        price: 91,
        spicy: 1,
        image: "/menu/dynamite-bao-shrimp.jpg",
      },
    ],
  },
  {
    id: "rice",
    title: "Rice",
    items: [
      {
        id: "shrimp-fried-rice",
        name: "Shrimp Fried Rice",
        description: "Special fried rice with shrimp and vegetables.",
        originalPrice: 370,
        price: 259,
        featured: true,
        image: "/menu/shrimp-fried-rice.jpg",
      },
      {
        id: "steamed-rice",
        name: "Steamed Rice",
        description: "Steamed white rice.",
        originalPrice: 100,
        price: 70,
        image: "/menu/steamed-rice.jpg",
      },
    ],
  },
  {
    id: "salad",
    title: "Salad",
    items: [
      {
        id: "thai-beef-salad",
        name: "Thai Beef Salad",
        description: "Thai-style salad with marinated beef slices.",
        originalPrice: 340,
        price: 238,
        image: "/menu/thai-beef-salad.jpg",
      },
      {
        id: "korean-chicken-salad",
        name: "Korean Chicken Salad",
        description: "Salad with grilled chicken, Korean style.",
        originalPrice: 320,
        price: 224,
        image: "/menu/korean-chicken-salad.jpg",
      },
      {
        id: "korean-kimchi-salad",
        name: "Korean Kimchi Salad",
        description:
          "Spicy Korean kimchi, traditionally fermented, with fresh vegetables.",
        originalPrice: 100,
        price: 70,
        spicy: 1,
        image: "/menu/korean-kimchi-salad.jpg",
      },
    ],
  },
  {
    id: "sauces",
    title: "Sauces",
    items: [
      {
        id: "spicy-sauce",
        name: "Spicy Sauce",
        description: "Cooked and seasoned spicy pepper paste.",
        originalPrice: 25,
        price: 25,
        spicy: 1,
      },
      {
        id: "soya-sauce",
        name: "Soya Sauce",
        description: "Classic soy dipping sauce.",
        originalPrice: 25,
        price: 25,
      },
      {
        id: "japanese-spicy-oil",
        name: "Japanese Spicy Oil",
        description: "Spicy oil mixed with sesame oil, Japanese style.",
        originalPrice: 25,
        price: 25,
        spicy: 1,
      },
      {
        id: "teriyaki-sauce",
        name: "Teriyaki Sauce",
        description: "Savory, slightly sweet soy-based sauce.",
        originalPrice: 25,
        price: 25,
      },
    ],
  },
];

const choicesFrom = (...categoryIds: string[]) =>
  categoryIds.flatMap(
    (id) => MENU.find((c) => c.id === id)?.items.map((i) => i.name) ?? []
  );

// What customers pick inside each offer. Built from the menu so renamed or
// removed dishes stay in step.
const OFFER_OPTIONS: Record<string, MenuOption[]> = {
  "noodles-combo-offer": [
    { label: "Noodles", choices: choicesFrom("noodles") },
    { label: "Salad", choices: choicesFrom("salad") },
    { label: "Appetizer", choices: choicesFrom("appetizers", "pao") },
    { label: "Drink", choices: choicesFrom("drinks") },
  ],
  "special-combo-offer": [
    { label: "Main course", choices: choicesFrom("main-dishes") },
    {
      label: "Side",
      choices: ["Steamed Rice", "Fresh Vegetable Noodles", "Shrimp Fried Rice"],
    },
    { label: "Salad", choices: choicesFrom("salad") },
    { label: "Appetizer", choices: choicesFrom("appetizers", "pao") },
    { label: "Drink", choices: choicesFrom("drinks") },
  ],
  "bao-combo-offer": [
    { label: "Baos", choices: choicesFrom("pao"), pick: 3 },
    { label: "Drink", choices: choicesFrom("drinks") },
  ],
  "beef-black-pepper-bundle": [{ label: "Drink", choices: choicesFrom("drinks") }],
};

for (const item of MENU.flatMap((c) => c.items)) {
  if (OFFER_OPTIONS[item.id]) item.options = OFFER_OPTIONS[item.id];
}

export const FEATURED: MenuItem[] = MENU.flatMap((c) =>
  c.items.filter((i) => i.featured)
);

export const ALL_ITEMS: MenuItem[] = MENU.flatMap((c) => c.items);

export const choiceImage = (name: string) =>
  ALL_ITEMS.find((i) => i.name === name)?.image;

// Drinks and sauces show their full price on the menu, but the cart still
// gives them the same discount as the dishes.
const CART_ONLY_DISCOUNT_CATEGORIES = new Set(["drinks", "sauces"]);
const cartOnlyIds = new Set(
  MENU.filter((c) => CART_ONLY_DISCOUNT_CATEGORIES.has(c.id)).flatMap((c) =>
    c.items.map((i) => i.id)
  )
);

const discountPercent = (i: MenuItem) =>
  Math.round((1 - i.price / i.originalPrice) * 100);

const dishDiscounts = ALL_ITEMS.filter((i) => !cartOnlyIds.has(i.id)).map(
  discountPercent
);

const mostCommon = (xs: number[]) => {
  const counts = new Map<number, number>();
  for (const x of xs) counts.set(x, (counts.get(x) ?? 0) + 1);
  return [...counts].sort((a, b) => b[1] - a[1] || b[0] - a[0])[0][0];
};

export const SITE_DISCOUNT = mostCommon(dishDiscounts);

export function cartUnitPrice(item: MenuItem): number {
  if (!cartOnlyIds.has(item.id)) return item.price;
  return Math.floor(item.originalPrice * (1 - SITE_DISCOUNT / 100) + 0.5);
}

const maxDiscount = Math.max(...dishDiscounts);

export const DISCOUNT_NOTICE = dishDiscounts.every((d) => d === maxDiscount)
  ? `${maxDiscount}% discount applies to the whole menu`
  : `Up to ${maxDiscount}% off the menu`;

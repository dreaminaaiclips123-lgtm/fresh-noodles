export type MenuOption = {
  label: string;
  choices: string[];
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
  /** e.g. choice of rice or noodles — shown as a selector before adding to cart. */
  options?: MenuOption;
};

export type MenuCategory = {
  id: string;
  title: string;
  items: MenuItem[];
};

// Prices are synced from Fresh Noodles' Talabat listing by
// scripts/sync-talabat.mjs: originalPrice mirrors Talabat's original, and
// price applies Talabat's discount plus 5 extra percentage points.
export const MENU: MenuCategory[] = [
  {
    id: "soup",
    title: "Soup",
    items: [
      {
        id: "korean-beef-ramen-kimchi",
        name: "Korean Beef Ramen with Kimchi",
        description: "Korean ramen noodle soup with beef, vegetables, and kimchi.",
        originalPrice: 380,
        price: 323,
        featured: true,
        image: "/menu/korean-beef-ramen.jpg",
      },
      {
        id: "chicken-ramen-soup",
        name: "Chicken Ramen Soup",
        description: "Chicken ramen soup with vegetables and egg.",
        originalPrice: 370,
        price: 315,
        image: "/menu/chicken-ramen-soup.jpg",
      },
      {
        id: "tom-yum-shrimp-soup",
        name: "Tom Yum Shrimp Soup",
        description: "Spicy Thai soup with shrimp, mushrooms, and chili peppers.",
        originalPrice: 370,
        price: 315,
        spicy: 2,
        image: "/menu/tom-yum-shrimp-soup.jpg",
      },
      {
        id: "chicken-laksa-soup",
        name: "Chicken Laksa Soup",
        description: "Malaysian glass noodle soup with chicken and vegetables.",
        originalPrice: 370,
        price: 315,
        image: "/menu/chicken-laksa-soup.jpg",
      },
      {
        id: "laksa-shrimp-soup",
        name: "Laksa Shrimp Soup",
        description: "Malaysian noodle soup with shrimp and vegetables.",
        originalPrice: 390,
        price: 332,
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
        price: 153,
        featured: true,
        image: "/menu/spring-rolls.jpg",
      },
      {
        id: "spicy-dynamite-chicken",
        name: "Spicy Dynamite Chicken",
        description:
          "Crispy chicken pieces covered with our special spicy dynamite sauce, served hot.",
        originalPrice: 260,
        price: 221,
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
        originalPrice: 270,
        price: 230,
        spicy: 1,
        image: "/menu/beef-gyoza.jpg",
      },
      {
        id: "chicken-gyoza",
        name: "Chicken Gyoza",
        description: "Dumplings stuffed with chicken, covered with a spicy chili paste sauce.",
        originalPrice: 310,
        price: 264,
        spicy: 1,
        image: "/menu/chicken-gyoza.jpg",
      },
      {
        id: "shrimp-gyoza",
        name: "Shrimp Gyoza",
        description: "Dumplings stuffed with shrimp, served with ponzu sauce.",
        originalPrice: 340,
        price: 289,
        image: "/menu/shrimp-gyoza.jpg",
      },
      {
        id: "shrimp-dynamite",
        name: "Shrimp Dynamite",
        description:
          "Fried shrimp in tempura batter with a spicy mayonnaise-sriracha sauce.",
        originalPrice: 290,
        price: 247,
        spicy: 1,
        image: "/menu/shrimp-dynamite.jpg",
      },
      {
        id: "teriyaki-fries",
        name: "Teriyaki Fries",
        description: "French fries topped with teriyaki mayonnaise sauce.",
        originalPrice: 200,
        price: 170,
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
        originalPrice: 440,
        price: 374,
        tag: "BESTSELLER",
        featured: true,
        image: "/menu/sweet-sour-chicken.jpg",
      },
      {
        id: "black-pepper-beef",
        name: "Black Pepper Beef",
        description: "Sliced beef cooked with black pepper sauce.",
        originalPrice: 440,
        price: 374,
        featured: true,
        image: "/menu/black-pepper-beef.jpg",
      },
      {
        id: "sweet-sour-chicken-bundle",
        name: "Sweet & Sour Chicken Bundle",
        description:
          "Sweet & sour chicken dish, served with vegetables and salad.",
        originalPrice: 550,
        price: 523,
        options: { label: "Side", choices: ["Rice", "Noodles"] },
        image: "/menu/sweet-sour-chicken-bundle.jpg",
      },
      {
        id: "beef-black-pepper-bundle",
        name: "Beef with Black Pepper Bundle",
        description: "Black pepper beef dish with teriyaki potatoes and a drink.",
        originalPrice: 520,
        price: 494,
        image: "/menu/beef-black-pepper-bundle.jpg",
      },
      {
        id: "shrimp-teriyaki-sauce",
        name: "Shrimp with Teriyaki Sauce",
        description: "Fried shrimp with teriyaki sauce, mushrooms, peppers, and onions.",
        originalPrice: 390,
        price: 332,
        image: "/menu/shrimp-teriyaki-sauce.jpg",
      },
      {
        id: "teriyaki-chicken",
        name: "Teriyaki Chicken",
        description:
          "Tender chicken cooked in a rich teriyaki sauce with bell peppers, onions, and mushrooms.",
        originalPrice: 440,
        price: 374,
        image: "/menu/teriyaki-chicken.jpg",
      },
      {
        id: "spicy-szechuan-chicken",
        name: "Spicy Szechuan Chicken",
        description: "Chicken cooked with spicy Szechuan paste.",
        originalPrice: 440,
        price: 374,
        spicy: 2,
        image: "/menu/spicy-szechuan-chicken.jpg",
      },
      {
        id: "sichuan-spicy-shrimp",
        name: "Sichuan Spicy Shrimp",
        description: "Shrimp cooked in a spicy Sichuan-style sauce.",
        originalPrice: 440,
        price: 374,
        spicy: 2,
        image: "/menu/sichuan-spicy-shrimp.jpg",
      },
      {
        id: "sweet-and-sour-shrimp",
        name: "Sweet and Sour Shrimp",
        description: "Shrimp cooked in a sweet and sour sauce.",
        originalPrice: 440,
        price: 374,
        image: "/menu/sweet-and-sour-shrimp.jpg",
      },
      {
        id: "indian-chicken-curry",
        name: "Indian Chicken Curry",
        description:
          "Our signature Indian chicken curry, prepared with milk, onions, hot red peppers, and a blend of authentic Indian spices.",
        originalPrice: 400,
        price: 340,
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
        price: 19,
      },
      {
        id: "v-cola",
        name: "Fi Cola",
        description: "Carbonated soft drink.",
        originalPrice: 35,
        price: 33,
      },
      {
        id: "7-up",
        name: "7 UP",
        description: "Lemon-lime flavored soft drink.",
        originalPrice: 35,
        price: 33,
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
        originalPrice: 440,
        price: 374,
        spicy: 1,
        tag: "SIGNATURE",
        featured: true,
        image: "/menu/bulgogi-noodles.jpg",
      },
      {
        id: "chicken-noodles",
        name: "Chicken Noodles",
        description:
          "Egg noodles with vegetables, chicken, and sesame in the Chinese style.",
        originalPrice: 430,
        price: 366,
        tag: "BESTSELLER",
        featured: true,
        image: "/menu/chicken-noodles.jpg",
      },
      {
        id: "chicken-ramen-buldak",
        name: "Chicken Ramen with Spicy Korean Buldak Sauce",
        description: "Handmade ramen with spicy Korean buldak sauce.",
        originalPrice: 400,
        price: 340,
        spicy: 2,
        image: "/menu/chicken-ramen-buldak.jpg",
      },
      {
        id: "japanese-curry-chicken-ramen",
        name: "Japanese Curry Chicken Ramen",
        description:
          "Handmade ramen soup with chicken slices in authentic Japanese curry sauce, served with kimchi, sprouts, and fresh spinach.",
        originalPrice: 400,
        price: 340,
        image: "/menu/japanese-curry-chicken-ramen.jpg",
      },
      {
        id: "fresh-vegetable-noodles",
        name: "Fresh Vegetable Noodles",
        description: "Fried noodles with fresh vegetables.",
        originalPrice: 220,
        price: 187,
        image: "/menu/fresh-vegetable-noodles.jpg",
      },
      {
        id: "spicy-shrimp-noodles",
        name: "Spicy Shrimp Noodles",
        description: "Fried noodles with shrimp and butter in a spicy sauce.",
        originalPrice: 440,
        price: 374,
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
        price: 111,
        image: "/menu/beef-bulgogi-bao.jpg",
      },
      {
        id: "chicken-katsu-bao",
        name: "Chicken Katsu Bao",
        description: "Bao bun filled with chicken and katsu sauce.",
        originalPrice: 130,
        price: 111,
        image: "/menu/chicken-katsu-bao.jpg",
      },
      {
        id: "dynamite-bao-shrimp",
        name: "Dynamite Bao with Shrimp",
        description: "Bao bun stuffed with dynamite shrimp.",
        originalPrice: 130,
        price: 111,
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
        originalPrice: 300,
        price: 255,
        featured: true,
        image: "/menu/shrimp-fried-rice.jpg",
      },
      {
        id: "steamed-rice",
        name: "Steamed Rice",
        description: "Steamed white rice.",
        originalPrice: 100,
        price: 85,
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
        originalPrice: 290,
        price: 247,
        image: "/menu/thai-beef-salad.jpg",
      },
      {
        id: "korean-chicken-salad",
        name: "Korean Chicken Salad",
        description: "Salad with grilled chicken, Korean style.",
        originalPrice: 280,
        price: 238,
        image: "/menu/korean-chicken-salad.jpg",
      },
    ],
  },
];

export const FEATURED: MenuItem[] = MENU.flatMap((c) =>
  c.items.filter((i) => i.featured)
);

export const ALL_ITEMS: MenuItem[] = MENU.flatMap((c) => c.items);

const discounts = ALL_ITEMS.map((i) =>
  Math.round((1 - i.price / i.originalPrice) * 100)
);
const maxDiscount = Math.max(...discounts);

export const DISCOUNT_NOTICE = discounts.every((d) => d === maxDiscount)
  ? `${maxDiscount}% discount applies to the whole menu`
  : `Up to ${maxDiscount}% off the menu`;

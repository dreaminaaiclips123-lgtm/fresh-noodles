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

// Full menu, prices (EGP) and descriptions sourced from Fresh Noodles' own
// Talabat listing (talabat.com/egypt/restaurant/775136/fresh-nodles) — their
// live, current ordering menu. Talabat shows both an original and a
// discounted price for nearly every item; both are mirrored here exactly.
export const MENU: MenuCategory[] = [
  {
    id: "soup",
    title: "Soup",
    items: [
      {
        id: "korean-beef-ramen-kimchi",
        name: "Korean Beef Ramen with Kimchi",
        description: "Korean ramen noodle soup with beef, vegetables, and kimchi.",
        originalPrice: 320,
        price: 224,
        featured: true,
        image: "/menu/korean-beef-ramen.jpg",
      },
      {
        id: "chicken-ramen-soup",
        name: "Chicken Ramen Soup",
        description: "Chicken ramen soup with vegetables and egg.",
        originalPrice: 320,
        price: 224,
      },
      {
        id: "tom-yum-shrimp-soup",
        name: "Tom Yum Shrimp Soup",
        description: "Spicy Thai soup with shrimp, mushrooms, and chili peppers.",
        originalPrice: 250,
        price: 175,
        spicy: 2,
      },
      {
        id: "chicken-laksa-soup",
        name: "Chicken Laksa Soup",
        description: "Malaysian glass noodle soup with chicken and vegetables.",
        originalPrice: 320,
        price: 224,
      },
      {
        id: "laksa-shrimp-soup",
        name: "Laksa Shrimp Soup",
        description: "Malaysian noodle soup with shrimp and vegetables.",
        originalPrice: 350,
        price: 245,
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
        originalPrice: 130,
        price: 91,
        featured: true,
        image: "/menu/spring-rolls.jpg",
      },
      {
        id: "spicy-dynamite-chicken",
        name: "Spicy Dynamite Chicken",
        description:
          "Crispy chicken pieces covered with our special spicy dynamite sauce, served hot.",
        originalPrice: 210,
        price: 147,
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
        originalPrice: 220,
        price: 154,
        spicy: 1,
      },
      {
        id: "chicken-gyoza",
        name: "Chicken Gyoza",
        description: "Dumplings stuffed with chicken, covered with a spicy chili paste sauce.",
        originalPrice: 210,
        price: 147,
        spicy: 1,
      },
      {
        id: "shrimp-gyoza",
        name: "Shrimp Gyoza",
        description: "Dumplings stuffed with shrimp, served with ponzu sauce.",
        originalPrice: 230,
        price: 161,
      },
      {
        id: "shrimp-dynamite",
        name: "Shrimp Dynamite",
        description:
          "Fried shrimp in tempura batter with a spicy mayonnaise-sriracha sauce.",
        originalPrice: 250,
        price: 175,
        spicy: 1,
      },
      {
        id: "teriyaki-fries",
        name: "Teriyaki Fries",
        description: "French fries topped with teriyaki mayonnaise sauce.",
        originalPrice: 150,
        price: 105,
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
        originalPrice: 390,
        price: 273,
        tag: "BESTSELLER",
        featured: true,
        image: "/menu/sweet-sour-chicken.jpg",
      },
      {
        id: "black-pepper-beef",
        name: "Black Pepper Beef",
        description: "Sliced beef cooked with black pepper sauce.",
        originalPrice: 390,
        price: 273,
        featured: true,
        image: "/menu/black-pepper-beef.jpg",
      },
      {
        id: "sweet-sour-chicken-bundle",
        name: "Sweet & Sour Chicken Bundle",
        description:
          "Sweet & sour chicken dish, served with vegetables and salad.",
        originalPrice: 500,
        price: 350,
        options: { label: "Side", choices: ["Rice", "Noodles"] },
      },
      {
        id: "beef-black-pepper-bundle",
        name: "Beef with Black Pepper Bundle",
        description: "Black pepper beef dish with teriyaki potatoes and a drink.",
        originalPrice: 470,
        price: 329,
      },
      {
        id: "shrimp-teriyaki-sauce",
        name: "Shrimp with Teriyaki Sauce",
        description: "Fried shrimp with teriyaki sauce, mushrooms, peppers, and onions.",
        originalPrice: 390,
        price: 273,
      },
      {
        id: "teriyaki-chicken",
        name: "Teriyaki Chicken",
        description:
          "Tender chicken cooked in a rich teriyaki sauce with bell peppers, onions, and mushrooms.",
        originalPrice: 390,
        price: 273,
      },
      {
        id: "spicy-szechuan-chicken",
        name: "Spicy Szechuan Chicken",
        description: "Chicken cooked with spicy Szechuan paste.",
        originalPrice: 390,
        price: 273,
        spicy: 2,
      },
      {
        id: "sichuan-spicy-shrimp",
        name: "Sichuan Spicy Shrimp",
        description: "Shrimp cooked in a spicy Sichuan-style sauce.",
        originalPrice: 390,
        price: 273,
        spicy: 2,
      },
      {
        id: "sweet-and-sour-shrimp",
        name: "Sweet and Sour Shrimp",
        description: "Shrimp cooked in a sweet and sour sauce.",
        originalPrice: 390,
        price: 273,
      },
      {
        id: "indian-chicken-curry",
        name: "Indian Chicken Curry",
        description:
          "Our signature Indian chicken curry, prepared with milk, onions, hot red peppers, and a blend of authentic Indian spices.",
        originalPrice: 350,
        price: 245,
        spicy: 1,
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
        name: "V Cola",
        description: "Carbonated soft drink.",
        originalPrice: 30,
        price: 30,
      },
      {
        id: "7-up",
        name: "7 UP",
        description: "Lemon-lime flavored soft drink.",
        originalPrice: 30,
        price: 30,
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
        originalPrice: 390,
        price: 273,
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
        originalPrice: 300,
        price: 210,
        tag: "BESTSELLER",
        featured: true,
        image: "/menu/chicken-noodles.jpg",
      },
      {
        id: "chicken-ramen-buldak",
        name: "Chicken Ramen with Spicy Korean Buldak Sauce",
        description: "Handmade ramen with spicy Korean buldak sauce.",
        originalPrice: 350,
        price: 245,
        spicy: 2,
      },
      {
        id: "japanese-curry-chicken-ramen",
        name: "Japanese Curry Chicken Ramen",
        description:
          "Handmade ramen soup with chicken slices in authentic Japanese curry sauce, served with kimchi, sprouts, and fresh spinach.",
        originalPrice: 350,
        price: 245,
      },
      {
        id: "fresh-vegetable-noodles",
        name: "Fresh Vegetable Noodles",
        description: "Fried noodles with fresh vegetables.",
        originalPrice: 170,
        price: 119,
      },
      {
        id: "spicy-shrimp-noodles",
        name: "Spicy Shrimp Noodles",
        description: "Fried noodles with shrimp and butter in a spicy sauce.",
        originalPrice: 390,
        price: 273,
        spicy: 2,
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
        originalPrice: 100,
        price: 70,
      },
      {
        id: "chicken-katsu-bao",
        name: "Chicken Katsu Bao",
        description: "Bao bun filled with chicken and katsu sauce.",
        originalPrice: 100,
        price: 70,
      },
      {
        id: "dynamite-bao-shrimp",
        name: "Dynamite Bao with Shrimp",
        description: "Bao bun stuffed with dynamite shrimp.",
        originalPrice: 100,
        price: 70,
        spicy: 1,
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
        price: 210,
        featured: true,
        image: "/menu/shrimp-fried-rice.jpg",
      },
      {
        id: "steamed-rice",
        name: "Steamed Rice",
        description: "Steamed white rice.",
        originalPrice: 70,
        price: 49,
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
        originalPrice: 250,
        price: 175,
      },
      {
        id: "korean-chicken-salad",
        name: "Korean Chicken Salad",
        description: "Salad with grilled chicken, Korean style.",
        originalPrice: 230,
        price: 161,
      },
    ],
  },
];

export const FEATURED: MenuItem[] = MENU.flatMap((c) =>
  c.items.filter((i) => i.featured)
);

export const ALL_ITEMS: MenuItem[] = MENU.flatMap((c) => c.items);

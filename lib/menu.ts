export type MenuOption = {
  label: string;
  choices: string[];
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number | null;
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
// live, current ordering menu. Prices shown are the regular menu price;
// Talabat lists a second, discounted price as a platform-specific delivery
// promo, which isn't used here since this site sells direct.
export const MENU: MenuCategory[] = [
  {
    id: "noodles",
    title: "Noodles",
    items: [
      {
        id: "spicy-korean-bulgogi-beef",
        name: "Spicy Korean Bulgogi Beef",
        description:
          "Korean-style marinated beef served with noodles, spicy Korean kimchi, and spicy sauce.",
        price: 390,
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
        price: 300,
        tag: "BESTSELLER",
        featured: true,
        image: "/menu/chicken-noodles.jpg",
      },
      {
        id: "chicken-ramen-buldak",
        name: "Chicken Ramen with Spicy Korean Buldak Sauce",
        description: "Handmade ramen with spicy Korean buldak sauce.",
        price: 350,
        spicy: 2,
      },
      {
        id: "japanese-curry-chicken-ramen",
        name: "Japanese Curry Chicken Ramen",
        description:
          "Handmade ramen soup with chicken slices in authentic Japanese curry sauce, served with kimchi, sprouts, and fresh spinach.",
        price: 350,
      },
      {
        id: "fresh-vegetable-noodles",
        name: "Fresh Vegetable Noodles",
        description: "Fried noodles with fresh vegetables.",
        price: 170,
      },
      {
        id: "spicy-shrimp-noodles",
        name: "Spicy Shrimp Noodles",
        description: "Fried noodles with shrimp and butter in a spicy sauce.",
        price: 390,
        spicy: 2,
      },
    ],
  },
  {
    id: "main-dishes",
    title: "Main Dishes",
    items: [
      {
        id: "sweet-and-sour-chicken",
        name: "Sweet and Sour Chicken",
        description: "Chicken pieces cooked in sweet and sour sauce.",
        price: 390,
        tag: "BESTSELLER",
        featured: true,
        image: "/menu/sweet-sour-chicken.jpg",
      },
      {
        id: "black-pepper-beef",
        name: "Black Pepper Beef",
        description: "Sliced beef cooked with black pepper sauce.",
        price: 390,
        featured: true,
        image: "/menu/black-pepper-beef.jpg",
      },
      {
        id: "sweet-sour-chicken-bundle",
        name: "Sweet & Sour Chicken Bundle",
        description:
          "Sweet & sour chicken dish, served with vegetables and salad.",
        price: 500,
        options: { label: "Side", choices: ["Rice", "Noodles"] },
      },
      {
        id: "beef-black-pepper-bundle",
        name: "Beef with Black Pepper Bundle",
        description: "Black pepper beef dish with teriyaki potatoes and a drink.",
        price: 470,
      },
      {
        id: "shrimp-teriyaki-sauce",
        name: "Shrimp with Teriyaki Sauce",
        description: "Fried shrimp with teriyaki sauce, mushrooms, peppers, and onions.",
        price: 390,
      },
      {
        id: "teriyaki-chicken",
        name: "Teriyaki Chicken",
        description:
          "Tender chicken cooked in a rich teriyaki sauce with bell peppers, onions, and mushrooms.",
        price: 390,
      },
      {
        id: "spicy-szechuan-chicken",
        name: "Spicy Szechuan Chicken",
        description: "Chicken cooked with spicy Szechuan paste.",
        price: 390,
        spicy: 2,
      },
      {
        id: "sichuan-spicy-shrimp",
        name: "Sichuan Spicy Shrimp",
        description: "Shrimp cooked in a spicy Sichuan-style sauce.",
        price: 390,
        spicy: 2,
      },
      {
        id: "sweet-and-sour-shrimp",
        name: "Sweet and Sour Shrimp",
        description: "Shrimp cooked in a sweet and sour sauce.",
        price: 390,
      },
      {
        id: "indian-chicken-curry",
        name: "Indian Chicken Curry",
        description:
          "Our signature Indian chicken curry, prepared with milk, onions, hot red peppers, and a blend of authentic Indian spices.",
        price: 350,
        spicy: 1,
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
        price: 130,
        featured: true,
        image: "/menu/spring-rolls.jpg",
      },
      {
        id: "spicy-dynamite-chicken",
        name: "Spicy Dynamite Chicken",
        description:
          "Crispy chicken pieces covered with our special spicy dynamite sauce, served hot.",
        price: 210,
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
        price: 220,
        spicy: 1,
      },
      {
        id: "chicken-gyoza",
        name: "Chicken Gyoza",
        description: "Dumplings stuffed with chicken, covered with a spicy chili paste sauce.",
        price: 210,
        spicy: 1,
      },
      {
        id: "shrimp-gyoza",
        name: "Shrimp Gyoza",
        description: "Dumplings stuffed with shrimp, served with ponzu sauce.",
        price: 230,
      },
      {
        id: "shrimp-dynamite",
        name: "Shrimp Dynamite",
        description:
          "Fried shrimp in tempura batter with a spicy mayonnaise-sriracha sauce.",
        price: 250,
        spicy: 1,
      },
      {
        id: "teriyaki-fries",
        name: "Teriyaki Fries",
        description: "French fries topped with teriyaki mayonnaise sauce.",
        price: 150,
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
        price: 320,
        featured: true,
        image: "/menu/korean-beef-ramen.jpg",
      },
      {
        id: "chicken-ramen-soup",
        name: "Chicken Ramen Soup",
        description: "Chicken ramen soup with vegetables and egg.",
        price: 320,
      },
      {
        id: "tom-yum-shrimp-soup",
        name: "Tom Yum Shrimp Soup",
        description: "Spicy Thai soup with shrimp, mushrooms, and chili peppers.",
        price: 250,
        spicy: 2,
      },
      {
        id: "chicken-laksa-soup",
        name: "Chicken Laksa Soup",
        description: "Malaysian glass noodle soup with chicken and vegetables.",
        price: 320,
      },
      {
        id: "laksa-shrimp-soup",
        name: "Laksa Shrimp Soup",
        description: "Malaysian noodle soup with shrimp and vegetables.",
        price: 350,
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
        price: 100,
      },
      {
        id: "chicken-katsu-bao",
        name: "Chicken Katsu Bao",
        description: "Bao bun filled with chicken and katsu sauce.",
        price: 100,
      },
      {
        id: "dynamite-bao-shrimp",
        name: "Dynamite Bao with Shrimp",
        description: "Bao bun stuffed with dynamite shrimp.",
        price: 100,
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
        price: 300,
        featured: true,
        image: "/menu/shrimp-fried-rice.jpg",
      },
      {
        id: "steamed-rice",
        name: "Steamed Rice",
        description: "Steamed white rice.",
        price: 70,
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
        price: 250,
      },
      {
        id: "korean-chicken-salad",
        name: "Korean Chicken Salad",
        description: "Salad with grilled chicken, Korean style.",
        price: 230,
      },
    ],
  },
];

export const FEATURED: MenuItem[] = MENU.flatMap((c) =>
  c.items.filter((i) => i.featured)
);

export const ALL_ITEMS: MenuItem[] = MENU.flatMap((c) => c.items);

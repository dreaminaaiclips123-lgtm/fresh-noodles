export type MenuItem = {
  id: string;
  name: string;
  nameKr?: string;
  description: string;
  price: number | null;
  spicy?: 1 | 2 | 3;
};

export type MenuCategory = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  items: MenuItem[];
};

// Prices in EGP, sourced from FN's own posted menu where available.
// price: null means it wasn't on the posted menu — shown as "Ask in-store".
export const MENU: MenuCategory[] = [
  {
    id: "noodle-bowls",
    title: "Noodle Bowls",
    subtitle: "Fresh noodles, tossed to order",
    image: "/menu/main-dishes.jpg",
    imageAlt:
      "Two bowls of Fresh Noodles' Beef Bulgogi and Chicken Noodles on a dark table",
    items: [
      {
        id: "beef-bulgogi",
        name: "Beef Bulgogi Noodles",
        nameKr: "불고기 누들",
        description:
          "Tender beef slices marinated in our signature bulgogi sauce, served over fresh noodles.",
        price: null,
      },
      {
        id: "chicken-noodles",
        name: "Chicken Noodles",
        nameKr: "치킨 누들",
        description:
          "Juicy chicken with fresh veggies and our special Asian sauce, tossed with noodles.",
        price: null,
      },
    ],
  },
  {
    id: "wok-mains",
    title: "Wok Mains",
    subtitle: "Szechuan, teriyaki & curry, wok-fired",
    image: "/menu/main-dishes.jpg",
    imageAlt: "Fresh Noodles wok mains plated on dark ceramic",
    items: [
      { id: "black-pepper-beef", name: "Black Pepper Beef", description: "Seared beef in a bold black pepper sauce.", price: 370 },
      { id: "beef-szechuan", name: "Beef Szechuan", description: "Beef stir-fried in a numbing Szechuan chili sauce.", price: 370, spicy: 2 },
      { id: "beef-teriyaki", name: "Beef Teriyaki", description: "Beef glazed in a sweet-savory teriyaki reduction.", price: 370 },
      { id: "chicken-sweet-sour", name: "Chicken Sweet & Sour", description: "Crispy chicken tossed in a tangy sweet and sour glaze.", price: 330 },
      { id: "szechuan-chicken", name: "Szechuan Chicken", description: "Wok-fired chicken in a fiery Szechuan chili sauce.", price: 330, spicy: 2 },
      { id: "chicken-teriyaki", name: "Chicken Teriyaki", description: "Chicken glazed in a sweet-savory teriyaki reduction.", price: 330 },
      { id: "chicken-curry", name: "Chicken Curry", description: "Chicken simmered in a fragrant house curry sauce.", price: 330 },
      { id: "spicy-shrimp-szechuan", name: "Spicy Shrimp Szechuan", description: "Shrimp wok-fired in our hottest Szechuan chili sauce.", price: 350, spicy: 3 },
      { id: "szechuan-shrimp", name: "Szechuan Shrimp", description: "Shrimp stir-fried in a numbing Szechuan chili sauce.", price: 350, spicy: 2 },
      { id: "shrimp-curry", name: "Shrimp Curry", description: "Shrimp simmered in a fragrant house curry sauce.", price: 350 },
      { id: "shrimp-teriyaki", name: "Shrimp Teriyaki", description: "Shrimp glazed in a sweet-savory teriyaki reduction.", price: 350 },
    ],
  },
  {
    id: "appetizers",
    title: "Appetizers",
    subtitle: "Fried, crispy, made to share",
    image: "/menu/appetizers.jpg",
    imageAlt:
      "Crispy spring rolls, sesame dumplings and fried wings on red plates",
    items: [
      { id: "spring-rolls", name: "Crispy Spring Rolls", description: "Hand-rolled and fried to order, served with our house dipping sauce.", price: null },
      { id: "sesame-dumplings", name: "Sesame Dumplings", description: "Pan-seared dumplings finished with toasted sesame and scallion.", price: null },
      { id: "crispy-wings", name: "Crispy Fried Wings", description: "Double-fried wings tossed in a sweet-spicy glaze and fresh herbs.", price: null, spicy: 1 },
    ],
  },
];

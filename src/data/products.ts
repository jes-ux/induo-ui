export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export const products: Product[] = [
  { id: "jbl-clip4", name: "JBL Parlante Clip 4", price: 219500, image: "/products/jbl.jpg" },
  { id: "jbl-clip4-black-orange", name: "JBL Parlante Clip 4 Black/Orange", price: 249500, image: "/products/jbl3.jpg" },
  { id: "stanley-termo-verde", name: "Stanley Termo Acero Inoxidable 236ml Verde", price: 140700, image: "/products/stanley.jpg" },
  { id: "stanley-termo-classic", name: "Stanley Termo Classic Trigger 350ml", price: 155000, image: "/products/stanley2.jpg" },
  { id: "logitech-pop-mouse", name: "Logitech Mouse POP", price: 190300, image: "/products/logi.jpg" },
  { id: "logitech-pop-mouse-emoji", name: "Logitech Mouse POP Emoji Edition", price: 175000, image: "/products/logi2.jpg" },
  { id: "microsoft-modern-mobile-mouse", name: "Microsoft Mouse Modern Mobile", price: 120500, image: "/products/micro.jpg" },
  { id: "hp-wireless-mouse", name: "HP Mouse Inalámbrico", price: 60700, image: "/products/hp.jpg" },
];

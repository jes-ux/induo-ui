export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  /** Si es true, la card muestra el badge "Novedad". */
  isNew: boolean;
  /** Si es true, la card muestra el label "Envío Gratis". */
  freeShipping: boolean;
}

export const products: Product[] = [
  { id: "jbl-clip4", name: "JBL Parlante Clip 4", price: 219500, image: "/products/jbl.jpg", isNew: true, freeShipping: true },
  { id: "jbl-clip4-black-orange", name: "JBL Parlante Clip 4 Black/Orange", price: 249500, image: "/products/jbl3.jpg", isNew: false, freeShipping: true },
  { id: "stanley-termo-verde", name: "Stanley Termo Acero Inoxidable 236ml Verde", price: 140700, image: "/products/stanley.jpg", isNew: false, freeShipping: true },
  { id: "stanley-termo-classic", name: "Stanley Termo Classic Trigger 350ml", price: 155000, image: "/products/stanley2.jpg", isNew: true, freeShipping: false },
  { id: "logitech-pop-mouse", name: "Logitech Mouse POP", price: 190300, image: "/products/logi.jpg", isNew: false, freeShipping: false },
  { id: "logitech-pop-mouse-emoji", name: "Logitech Mouse POP Emoji Edition", price: 175000, image: "/products/logi2.jpg", isNew: true, freeShipping: true },
  { id: "microsoft-modern-mobile-mouse", name: "Microsoft Mouse Modern Mobile", price: 120500, image: "/products/micro.jpg", isNew: false, freeShipping: true },
  { id: "hp-wireless-mouse", name: "HP Mouse Inalámbrico", price: 60700, image: "/products/hp.jpg", isNew: false, freeShipping: false },
];

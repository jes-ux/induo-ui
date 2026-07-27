import type { Meta, StoryObj } from "@storybook/react";
import { ProductCarousel } from "./ProductCarousel";
import { ProductCard } from "../ProductCard/ProductCard";
import { Badge } from "../Badge/Badge";
import { products, type Product } from "../../data/products";

const priceFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

function toProductCardProps(product: Product) {
  const [brand, ...titleWords] = product.name.split(" ");
  return {
    image: product.image,
    brand,
    title: titleWords.join(" "),
    price: priceFormatter.format(product.price),
    badge: product.isNew ? (
      <Badge variant="information" size="small">
        Novedad
      </Badge>
    ) : undefined,
    shipping: product.freeShipping ? "Envío Gratis" : undefined,
  };
}

const meta: Meta<typeof ProductCarousel> = {
  title: "Componentes/ProductCarousel",
  component: ProductCarousel,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof ProductCarousel>;

export const Default: Story = {
  args: {
    title: "Novedades",
    seeAllLabel: "Mostrar todo",
    children: products.map((product) => <ProductCard key={product.id} {...toProductCardProps(product)} />),
  },
};

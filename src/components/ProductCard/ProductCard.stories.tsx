import type { Meta, StoryObj } from "@storybook/react";
import { ProductCard } from "./ProductCard";
import { Badge } from "../Badge/Badge";

const meta: Meta<typeof ProductCard> = {
  title: "Componentes/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    image: "/products/jbl.jpg",
    brand: "JBL",
    title: "Parlante Bluetooth Clip 4 Resistente al Agua",
    price: "$ 219.500",
    badge: (
      <Badge variant="information" size="small">
        Novedad
      </Badge>
    ),
    shipping: "Envío Gratis",
  },
};

export const SinBadgeNiEnvio: Story = {
  args: {
    image: "/products/logi.jpg",
    brand: "Logitech",
    title: "Mouse Inalámbrico POP Compacto Silencioso",
    price: "$ 190.300",
  },
};

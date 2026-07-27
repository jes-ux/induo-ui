import type { Meta, StoryObj } from "@storybook/react";
import { ContextualCard } from "./ContextualCard";

const meta: Meta<typeof ContextualCard> = {
  title: "Componentes/ContextualCard",
  component: ContextualCard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof ContextualCard>;

export const Default: Story = {
  args: { message: "Vas a  pagar impuestos y servicios con factura", actionLabel: "Volver" },
};

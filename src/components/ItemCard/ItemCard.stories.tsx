import type { Meta, StoryObj } from "@storybook/react";
import { ItemCard } from "./ItemCard";
import { PackagePinLocationIcon } from "../icons/PackagePinLocationIcon";

const meta: Meta<typeof ItemCard> = {
  title: "Componentes/ItemCard",
  component: ItemCard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof ItemCard>;

export const NoSeleccionado: Story = { args: { icon: <PackagePinLocationIcon />, label: "Envío a domicilio" } };
export const Seleccionado: Story = {
  args: { icon: <PackagePinLocationIcon />, label: "Retiro en sucursal", selected: true },
};

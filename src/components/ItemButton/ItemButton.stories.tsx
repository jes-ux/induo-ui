import type { Meta, StoryObj } from "@storybook/react";
import { ItemButton } from "./ItemButton";
import { PinLocationIcon } from "../icons/PinLocationIcon";

const meta: Meta<typeof ItemButton> = {
  title: "Componentes/ItemButton",
  component: ItemButton,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof ItemButton>;

export const Default: Story = { args: { icon: <PinLocationIcon />, label: "Información personal" } };
export const ConSubtitulo: Story = {
  args: { icon: <PinLocationIcon />, label: "Direcciones", subtitle: "2 guardadas" },
};

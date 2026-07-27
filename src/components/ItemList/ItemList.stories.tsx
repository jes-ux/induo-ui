import type { Meta, StoryObj } from "@storybook/react";
import { ItemList } from "./ItemList";
import { InterfaceEssentialCheckmarkCircleIcon } from "../icons/InterfaceEssentialCheckmarkCircleIcon";
import { InterfaceEssentialStarFavoriteAddIcon } from "../icons/InterfaceEssentialStarFavoriteAddIcon";
import { InterfaceEssentialDeleteCrossHexagonIcon } from "../icons/InterfaceEssentialDeleteCrossHexagonIcon";
import { InterfaceEssentialBackwardBackIcon } from "../icons/InterfaceEssentialBackwardBackIcon";

const meta: Meta<typeof ItemList> = {
  title: "Componentes/ItemList",
  component: ItemList,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["information", "success", "warning", "error"] },
  },
};
export default meta;
type Story = StoryObj<typeof ItemList>;

export const Success: Story = {
  args: {
    icon: <InterfaceEssentialCheckmarkCircleIcon />,
    variant: "success",
    title: "Termo Stanley",
    amount: "349.287 pts",
    statusLabel: "Consumo aprobado",
    date: "24/07/24",
  },
};
export const Information: Story = {
  args: {
    icon: <InterfaceEssentialStarFavoriteAddIcon />,
    variant: "information",
    title: "Pago de servicio",
    amount: "250 pts",
    statusLabel: "Acreditación de puntos",
    date: "24/07/24",
  },
};
export const Error: Story = {
  args: {
    icon: <InterfaceEssentialDeleteCrossHexagonIcon />,
    variant: "error",
    title: "Termo Stanley",
    amount: "0 pts",
    statusLabel: "Consumo cancelado",
    date: "24/07/24",
  },
};
export const Devolucion: Story = {
  args: {
    icon: <InterfaceEssentialBackwardBackIcon />,
    variant: "information",
    title: "Termo Stanley",
    amount: "349.287 pts",
    statusLabel: "Devolución de puntos",
    date: "24/07/24",
  },
};

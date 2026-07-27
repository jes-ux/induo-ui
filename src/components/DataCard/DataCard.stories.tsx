import type { Meta, StoryObj } from "@storybook/react";
import { DataCard } from "./DataCard";

const meta: Meta<typeof DataCard> = {
  title: "Componentes/DataCard",
  component: DataCard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof DataCard>;

export const Default: Story = { args: { label: "Nombre y apellido", value: "Juan Carlos Domínguez", onEdit: () => {} } };
export const SinEditar: Story = { args: { label: "Nombre y apellido", value: "Juan Carlos Domínguez" } };

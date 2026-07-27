import type { Meta, StoryObj } from "@storybook/react";
import { FilterBadge } from "./FilterBadge";

const meta: Meta<typeof FilterBadge> = {
  title: "Componentes/FilterBadge",
  component: FilterBadge,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof FilterBadge>;

export const ConCerrar: Story = { args: { label: "Stanley", onRemove: () => {} } };
export const SinAccionDeCerrar: Story = { args: { label: "Sin acción de cerrar" } };

import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Componentes/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["information", "success", "warning", "error", "action"] },
    size: { control: "select", options: ["regular", "small"] },
  },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Information: Story = { args: { variant: "information", children: "Novedad" } };
export const Success: Story = { args: { variant: "success", children: "Aprobado" } };
export const Warning: Story = { args: { variant: "warning", children: "Pendiente" } };
export const Error: Story = { args: { variant: "error", children: "Rechazado" } };

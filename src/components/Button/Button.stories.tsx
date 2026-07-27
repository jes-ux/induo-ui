import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Componentes/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "outlined", "text"] },
    size: { control: "select", options: ["medium", "small"] },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { variant: "primary", children: "Continuar" } };
export const Secondary: Story = { args: { variant: "secondary", children: "Continuar" } };
export const Outlined: Story = { args: { variant: "outlined", children: "Filtrar" } };
export const Text: Story = { args: { variant: "text", children: "Ver más" } };
export const Disabled: Story = { args: { variant: "primary", children: "Continuar", disabled: true } };

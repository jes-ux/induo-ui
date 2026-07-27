import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Componentes/Input",
  component: Input,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = { args: { placeholder: "Medio de pago" } };
export const ConError: Story = { args: { placeholder: "Con error", errorMessage: "Este campo es obligatorio" } };
export const ConAyuda: Story = { args: { placeholder: "Con ayuda", helperText: "Lo vas a ver en tu resumen" } };

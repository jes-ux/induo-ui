import type { Meta, StoryObj } from "@storybook/react";
import { RadioButton } from "./RadioButton";

const meta: Meta<typeof RadioButton> = {
  title: "Componentes/RadioButton",
  component: RadioButton,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof RadioButton>;

export const Seleccionado: Story = { args: { name: "metodo-pago", label: "Efectivo", defaultChecked: true } };
export const NoSeleccionado: Story = { args: { name: "metodo-pago", label: "Tarjeta" } };
export const Disabled: Story = { args: { name: "metodo-pago", label: "Deshabilitado", disabled: true } };

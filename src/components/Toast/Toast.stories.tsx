import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "Componentes/Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "success", "warning", "error"] },
  },
};
export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = { args: { variant: "default", message: "Tu sesión expiró", actionLabel: "Ingresar" } };
export const Success: Story = { args: { variant: "success", message: "Dirección eliminada", actionLabel: "Deshacer" } };
export const Warning: Story = {
  args: { variant: "warning", message: "Esta orden tiene una consulta abierta", actionLabel: "Ir a cerrar" },
};
export const Error: Story = {
  args: { variant: "error", message: "Ocurrió un problema con tus datos", actionLabel: "Aceptar" },
};

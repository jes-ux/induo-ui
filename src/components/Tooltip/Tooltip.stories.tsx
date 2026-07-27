import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button/Button";

const meta: Meta<typeof Tooltip> = {
  title: "Componentes/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const ConCierre: Story = {
  args: {
    message: "Ingresa con tu dirección de correo electrónico",
    onClose: () => {},
    defaultOpen: true,
    children: <Button variant="secondary">Hover / focus acá</Button>,
  },
};

export const ConAccion: Story = {
  args: {
    message: "Ingresa con tu dirección de correo electrónico",
    actionLabel: "Necesito ayuda para continuar",
    defaultOpen: true,
    children: <Button variant="outlined">Con acción</Button>,
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Componentes/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = { args: { label: "Acepto los términos y condiciones", defaultChecked: true } };
export const Disabled: Story = { args: { label: "Deshabilitado", disabled: true } };
export const DisabledMarcado: Story = { args: { label: "Deshabilitado marcado", disabled: true, defaultChecked: true } };

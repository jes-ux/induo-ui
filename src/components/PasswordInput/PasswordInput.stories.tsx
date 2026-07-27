import type { Meta, StoryObj } from "@storybook/react";
import { PasswordInput } from "./PasswordInput";

const meta: Meta<typeof PasswordInput> = {
  title: "Componentes/PasswordInput",
  component: PasswordInput,
  tags: ["autodocs"],
  argTypes: {
    strength: { control: "select", options: ["weak", "medium", "strong"] },
  },
};
export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = { args: { value: "", onChange: () => {}, placeholder: "Contraseña" } };

export const Completo: Story = {
  args: {
    value: "Abcdef12",
    onChange: () => {},
    strength: "strong",
    requirements: [
      { label: "8 caracteres o más", met: true },
      { label: "1 letra mayúscula o más", met: true },
      { label: "1 símbolo o más (ej: ? + !)", met: true },
      { label: "1 número o más", met: true },
    ],
  },
};

export const Error: Story = {
  args: {
    value: "abc",
    onChange: () => {},
    strength: "weak",
    errorMessage: "La contraseña no coincide",
    requirements: [
      { label: "8 caracteres o más", met: false },
      { label: "1 letra mayúscula o más", met: true },
      { label: "1 símbolo o más (ej: ? + !)", met: true },
      { label: "1 número o más", met: false },
    ],
  },
};

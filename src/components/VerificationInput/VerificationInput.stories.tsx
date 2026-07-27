import type { Meta, StoryObj } from "@storybook/react";
import { VerificationInput } from "./VerificationInput";

const meta: Meta<typeof VerificationInput> = {
  title: "Componentes/VerificationInput",
  component: VerificationInput,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof VerificationInput>;

export const ConAyuda: Story = {
  args: { value: "", onChange: () => {}, helperText: "Ingresá el código que te enviamos" },
};

export const ConError: Story = {
  args: { value: "12", onChange: () => {}, errorMessage: "El código no es válido" },
};

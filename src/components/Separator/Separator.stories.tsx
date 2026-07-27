import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./Separator";

const meta: Meta<typeof Separator> = {
  title: "Componentes/Separator",
  component: Separator,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Separator>;

export const Default: Story = {
  render: () => (
    <div className="w-[400px]">
      <Separator />
    </div>
  ),
};

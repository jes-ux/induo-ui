import type { Meta, StoryObj } from "@storybook/react";
import { SpecialButton } from "./SpecialButton";
import { getCategoryIcon } from "../../icons/category-icons";

const AireLibreIcon = getCategoryIcon("aire-libre")!;

const meta: Meta<typeof SpecialButton> = {
  title: "Componentes/SpecialButton",
  component: SpecialButton,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof SpecialButton>;

export const Default: Story = { args: { icon: <AireLibreIcon />, label: "Aire libre y recreación" } };

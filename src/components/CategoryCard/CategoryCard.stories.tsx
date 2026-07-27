import type { Meta, StoryObj } from "@storybook/react";
import { CategoryCard } from "./CategoryCard";
import { getCategoryIcon } from "../../icons/category-icons";

const AireLibreIcon = getCategoryIcon("aire-libre")!;
const GastronomiaIcon = getCategoryIcon("gastronomia")!;

const meta: Meta<typeof CategoryCard> = {
  title: "Componentes/CategoryCard",
  component: CategoryCard,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof CategoryCard>;

export const AireLibre: Story = { args: { icon: <AireLibreIcon />, label: "Aire libre" } };
export const Gastronomia: Story = { args: { icon: <GastronomiaIcon />, label: "Gastronomía" } };

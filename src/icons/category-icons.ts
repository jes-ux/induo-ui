import type { ComponentType, SVGProps } from "react";
import { OutdoorParkCafeTableUmbrellaIcon } from "../components/icons/OutdoorParkCafeTableUmbrellaIcon";
import { KitchenCookingBlenderMixerIcon } from "../components/icons/KitchenCookingBlenderMixerIcon";
import { EntertainmentCasinoBoardGameDeuceIcon } from "../components/icons/EntertainmentCasinoBoardGameDeuceIcon";
import { KitchenCookingForkSpoonKnifeIcon } from "../components/icons/KitchenCookingForkSpoonKnifeIcon";

export const categoryIcons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  "aire-libre": OutdoorParkCafeTableUmbrellaIcon,
  cocina: KitchenCookingBlenderMixerIcon,
  entretenimiento: EntertainmentCasinoBoardGameDeuceIcon,
  gastronomia: KitchenCookingForkSpoonKnifeIcon,
};

export function getCategoryIcon(category: string): ComponentType<SVGProps<SVGSVGElement>> | undefined {
  return categoryIcons[category];
}

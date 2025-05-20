import type { WheelPickerOption } from "@/components/library/application/WheelPicker";
import { WheelPicker, WheelPickerWrapper } from "@/components/library/application/WheelPicker";

const options: WheelPickerOption[] = [
  {
    label: "Next.js",
    value: "nextjs",
  },
  {
    label: "Vite",
    value: "vite",
  },
  {
    label: "Laravel",
    value: "laravel",
  },
  {
    label: "React Router",
    value: "react-router",
  },
  {
    label: "Astro",
    value: "astro",
  },
  {
    label: "TanStack Start",
    value: "tanstack-start",
  },
  {
    label: "TanStack Router",
    value: "tanstack-router",
  },
  {
    label: "Gatsby",
    value: "gatsby",
  },
];

export function WheelPickerSimpleDemo() {
  return (
    <WheelPickerWrapper>
      <WheelPicker
        options={options}
        defaultValue="react-router"
      />
    </WheelPickerWrapper>
  );
}

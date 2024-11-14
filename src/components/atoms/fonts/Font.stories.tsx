import { ComponentProps } from "react";
import { Meta, StoryObj } from "@storybook/react";
import Font from "./Font";

type StoryProps = ComponentProps<typeof Font>;

const meta: Meta<StoryProps> = {
  component: Font,
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: {
    color: "primary",
    size: "text-base",
    weight: "font-base",
    children:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima, tempore. Dolores repellat officia, autem commodi veritatis earum, et quibusdam enim iure quasi, a impedit dicta delectus. Ipsa quo earum excepturi?",
  },
  render: ({ color, size, weight, children }) => {
    return (
      <>
        <Font color={color} size={size} weight={weight}>
          {children}
        </Font>

        <Font color="primary" size="text-base" weight="font-base">
          {children}
        </Font>
        <Font color="primary" size="text-base" weight="font-medium">
          {children}
        </Font>
        <Font color="primary" size="text-base" weight="font-semibold">
          {children}
        </Font>
        <Font color="primary" size="text-base" weight="font-bold">
          {children}
        </Font>
        <Font color="primary" size="text-base" weight="font-extrabold">
          {children}
        </Font>

        <Font color="primary" size="text-lg1" weight="font-base">
          {children}
        </Font>
        <Font color="primary" size="text-lg2" weight="font-base">
          {children}
        </Font>
        <Font color="primary" size="text-lg3" weight="font-base">
          {children}
        </Font>
        <Font color="primary" size="text-lg4" weight="font-base">
          {children}
        </Font>
        <Font color="primary" size="text-lg5" weight="font-base">
          {children}
        </Font>

        <Font color="secondary" size="text-base" weight="font-base">
          {children}
        </Font>
        <Font color="secondary" size="text-lg1" weight="font-base">
          {children}
        </Font>
        <Font color="secondary" size="text-lg2" weight="font-base">
          {children}
        </Font>
        <Font color="secondary" size="text-lg3" weight="font-base">
          {children}
        </Font>
        <Font color="secondary" size="text-lg4" weight="font-base">
          {children}
        </Font>
        <Font color="secondary" size="text-lg5" weight="font-base">
          {children}
        </Font>
        <Font color="dark" size="text-base" weight="font-base">
          {children}
        </Font>
        <Font color="dark" size="text-lg1" weight="font-base">
          {children}
        </Font>
        <Font color="dark" size="text-lg2" weight="font-base">
          {children}
        </Font>
        <Font color="dark" size="text-lg3" weight="font-base">
          {children}
        </Font>
        <Font color="dark" size="text-lg4" weight="font-base">
          {children}
        </Font>
        <Font color="dark" size="text-lg5" weight="font-base">
          {children}
        </Font>
        <Font color="primary" size="text-base" weight="font-medium">
          {children}
        </Font>
        <Font color="primary" size="text-lg1" weight="font-medium">
          {children}
        </Font>
        <Font color="primary" size="text-lg2" weight="font-medium">
          {children}
        </Font>
        <Font color="primary" size="text-lg3" weight="font-medium">
          {children}
        </Font>
        <Font color="primary" size="text-lg4" weight="font-medium">
          {children}
        </Font>
        <Font color="primary" size="text-lg5" weight="font-medium">
          {children}
        </Font>
        <Font color="secondary" size="text-base" weight="font-medium">
          {children}
        </Font>
        <Font color="secondary" size="text-lg1" weight="font-medium">
          {children}
        </Font>
        <Font color="secondary" size="text-lg2" weight="font-medium">
          {children}
        </Font>
        <Font color="secondary" size="text-lg3" weight="font-medium">
          {children}
        </Font>
        <Font color="secondary" size="text-lg4" weight="font-medium">
          {children}
        </Font>
        <Font color="secondary" size="text-lg5" weight="font-medium">
          {children}
        </Font>
        <Font color="dark" size="text-base" weight="font-medium">
          {children}
        </Font>
        <Font color="dark" size="text-lg1" weight="font-medium">
          {children}
        </Font>
        <Font color="dark" size="text-lg2" weight="font-medium">
          {children}
        </Font>
        <Font color="dark" size="text-lg3" weight="font-medium">
          {children}
        </Font>
        <Font color="dark" size="text-lg4" weight="font-medium">
          {children}
        </Font>
        <Font color="dark" size="text-lg5" weight="font-medium">
          {children}
        </Font>
        <Font color="primary" size="text-base" weight="font-semibold">
          {children}
        </Font>
        <Font color="primary" size="text-lg1" weight="font-semibold">
          {children}
        </Font>
        <Font color="primary" size="text-lg2" weight="font-semibold">
          {children}
        </Font>
        <Font color="primary" size="text-lg3" weight="font-semibold">
          {children}
        </Font>
        <Font color="primary" size="text-lg4" weight="font-semibold">
          {children}
        </Font>
        <Font color="primary" size="text-lg5" weight="font-semibold">
          {children}
        </Font>
        <Font color="secondary" size="text-base" weight="font-semibold">
          {children}
        </Font>
        <Font color="secondary" size="text-lg1" weight="font-semibold">
          {children}
        </Font>
        <Font color="secondary" size="text-lg2" weight="font-semibold">
          {children}
        </Font>
        <Font color="secondary" size="text-lg3" weight="font-semibold">
          {children}
        </Font>
        <Font color="secondary" size="text-lg4" weight="font-semibold">
          {children}
        </Font>
        <Font color="secondary" size="text-lg5" weight="font-semibold">
          {children}
        </Font>
        <Font color="dark" size="text-base" weight="font-semibold">
          {children}
        </Font>
        <Font color="dark" size="text-lg1" weight="font-semibold">
          {children}
        </Font>
        <Font color="dark" size="text-lg2" weight="font-semibold">
          {children}
        </Font>
        <Font color="dark" size="text-lg3" weight="font-semibold">
          {children}
        </Font>
        <Font color="dark" size="text-lg4" weight="font-semibold">
          {children}
        </Font>
        <Font color="dark" size="text-lg5" weight="font-semibold">
          {children}
        </Font>
        <Font color="primary" size="text-base" weight="font-bold">
          {children}
        </Font>
        <Font color="primary" size="text-lg1" weight="font-bold">
          {children}
        </Font>
        <Font color="primary" size="text-lg2" weight="font-bold">
          {children}
        </Font>
        <Font color="primary" size="text-lg3" weight="font-bold">
          {children}
        </Font>
        <Font color="primary" size="text-lg4" weight="font-bold">
          {children}
        </Font>
        <Font color="primary" size="text-lg5" weight="font-bold">
          {children}
        </Font>
        <Font color="secondary" size="text-base" weight="font-bold">
          {children}
        </Font>
        <Font color="secondary" size="text-lg1" weight="font-bold">
          {children}
        </Font>
        <Font color="secondary" size="text-lg2" weight="font-bold">
          {children}
        </Font>
        <Font color="secondary" size="text-lg3" weight="font-bold">
          {children}
        </Font>
        <Font color="secondary" size="text-lg4" weight="font-bold">
          {children}
        </Font>
        <Font color="secondary" size="text-lg5" weight="font-bold">
          {children}
        </Font>
        <Font color="dark" size="text-base" weight="font-bold">
          {children}
        </Font>
        <Font color="dark" size="text-lg1" weight="font-bold">
          {children}
        </Font>
        <Font color="dark" size="text-lg2" weight="font-bold">
          {children}
        </Font>
        <Font color="dark" size="text-lg3" weight="font-bold">
          {children}
        </Font>
        <Font color="dark" size="text-lg4" weight="font-bold">
          {children}
        </Font>
        <Font color="dark" size="text-lg5" weight="font-bold">
          {children}
        </Font>
        <Font color="primary" size="text-base" weight="font-extrabold">
          {children}
        </Font>
        <Font color="primary" size="text-lg1" weight="font-extrabold">
          {children}
        </Font>
        <Font color="primary" size="text-lg2" weight="font-extrabold">
          {children}
        </Font>
        <Font color="primary" size="text-lg3" weight="font-extrabold">
          {children}
        </Font>
        <Font color="primary" size="text-lg4" weight="font-extrabold">
          {children}
        </Font>
        <Font color="primary" size="text-lg5" weight="font-extrabold">
          {children}
        </Font>
        <Font color="secondary" size="text-base" weight="font-extrabold">
          {children}
        </Font>
        <Font color="secondary" size="text-lg1" weight="font-extrabold">
          {children}
        </Font>
        <Font color="secondary" size="text-lg2" weight="font-extrabold">
          {children}
        </Font>
        <Font color="secondary" size="text-lg3" weight="font-extrabold">
          {children}
        </Font>
        <Font color="secondary" size="text-lg4" weight="font-extrabold">
          {children}
        </Font>
        <Font color="secondary" size="text-lg5" weight="font-extrabold">
          {children}
        </Font>
        <Font color="dark" size="text-base" weight="font-extrabold">
          {children}
        </Font>
        <Font color="dark" size="text-lg1" weight="font-extrabold">
          {children}
        </Font>
        <Font color="dark" size="text-lg2" weight="font-extrabold">
          {children}
        </Font>
        <Font color="dark" size="text-lg3" weight="font-extrabold">
          {children}
        </Font>
        <Font color="dark" size="text-lg4" weight="font-extrabold">
          {children}
        </Font>
        <Font color="dark" size="text-lg5" weight="font-extrabold">
          {children}
        </Font>
      </>
    );
  },
};

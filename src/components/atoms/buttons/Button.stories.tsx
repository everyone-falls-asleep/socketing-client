import { ComponentProps } from "react";
import { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

type StoryProps = ComponentProps<typeof Button>;

const meta: Meta<StoryProps> = {
  component: Button,
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "md",
    className: "",
  },
  render: (args) => {
    return <Button {...args}>Test</Button>;
  },
};

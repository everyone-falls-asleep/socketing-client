import { ComponentProps } from "react";
import { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

type StoryProps = ComponentProps<typeof Button>;

const meta: Meta<StoryProps> = {
  component: Button,
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: {
    children: "Test",
  },
  render: ({ children }) => {
    return (
      <>
        <Button variant="primary">{children}</Button>
        <Button variant="secondary">{children}</Button>
        <Button variant="white">{children}</Button>
        <Button variant="dark">{children}</Button>
      </>
    );
  },
};

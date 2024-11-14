import { ComponentProps } from "react";
import { Meta, StoryObj } from "@storybook/react";
import CardTitle from "./CardTitle";

type StoryProps = ComponentProps<typeof CardTitle>;

const meta: Meta<StoryProps> = {
  component: CardTitle,
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: {
    children: "카드 제목",
  },
  render: ({ children }) => {
    return (
      <>
        <CardTitle color="primary">{children}</CardTitle>
        <CardTitle color="secondary">{children}</CardTitle>
        <CardTitle color="dark">{children}</CardTitle>
      </>
    );
  },
};

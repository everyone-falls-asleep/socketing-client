import { ComponentProps } from "react";
import { Meta, StoryObj } from "@storybook/react";
import CardSubTitle from "./CardSubTitle";

type StoryProps = ComponentProps<typeof CardSubTitle>;

const meta: Meta<StoryProps> = {
  component: CardSubTitle,
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: {
    children: "카드 서브 제목",
  },
  render: ({ children }) => {
    return (
      <>
        <CardSubTitle color="primary">{children}</CardSubTitle>
        <CardSubTitle color="secondary">{children}</CardSubTitle>
        <CardSubTitle color="dark">{children}</CardSubTitle>
      </>
    );
  },
};

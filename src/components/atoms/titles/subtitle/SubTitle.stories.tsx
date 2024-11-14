import { ComponentProps } from "react";
import { Meta, StoryObj } from "@storybook/react";
import SubTitle from "./SubTitle";

type StoryProps = ComponentProps<typeof SubTitle>;

const meta: Meta<StoryProps> = {
  component: SubTitle,
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: {
    children: "서브 제목",
  },
  render: ({ children }) => {
    return (
      <>
        <SubTitle color="primary">{children}</SubTitle>
        <SubTitle color="secondary">{children}</SubTitle>
        <SubTitle color="dark">{children}</SubTitle>
      </>
    );
  },
};

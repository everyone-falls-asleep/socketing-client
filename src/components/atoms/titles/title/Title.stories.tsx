import { ComponentProps } from "react";
import { Meta, StoryObj } from "@storybook/react";
import Title from "./Title";

type StoryProps = ComponentProps<typeof Title>;

const meta: Meta<StoryProps> = {
  component: Title,
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: {
    children: "제목",
  },
  render: ({ children }) => {
    return (
      <>
        <Title color="primary">{children}</Title>
        <Title color="secondary">{children}</Title>
        <Title color="dark">{children}</Title>
      </>
    );
  },
};

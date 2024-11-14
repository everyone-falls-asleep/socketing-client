import { ComponentProps } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { LabeledInputProps } from "../../../types/components/common";
import LabeledInput from "./LabeledInput";

type StoryProps = ComponentProps<typeof LabeledInput>;

const meta: Meta<StoryProps> = {
  component: LabeledInput,
};

export default meta;
type Story = StoryObj<LabeledInputProps>;

export const Default: Story = {
  args: {
    label: "로그인",
    placeholder: "뭔가를 입력해주세요",
    value: "",
    type: "text",
    onChange: () => {
      console.log("로그인을 했습니다.");
    },
  },
  render: (args) => {
    return <LabeledInput {...args}></LabeledInput>;
  },
};

import { ComponentProps } from "react";
import { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";
import { InputProps } from "../../../types/components/common";

type StoryProps = ComponentProps<typeof Input>;

const meta: Meta<StoryProps> = {
  component: Input,
  args: {
    placeholder: "뭔가를 입력해주세요",
    value: "",
    type: "text",
  },
};

export default meta;
type Story = StoryObj<InputProps>;

// 기본 스토리
export const Default: Story = {
  args: {
    placeholder: "뭔가를 입력해주세요",
  },
};

// 비밀번호 타입
export const Password: Story = {
  args: {
    type: "password",
    placeholder: "비밀번호를 입력해주세요",
  },
};

// 사용자 지정 너비
export const CustomWidth: Story = {
  args: {
    placeholder: "storybook에서는 tailwind가 안먹혀서 이건 쓸모 없음.",
    className: "w-50",
  },
};

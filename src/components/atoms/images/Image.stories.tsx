import { ComponentProps } from "react";
import { Meta, StoryObj } from "@storybook/react";
import Image from "./Image";

type StoryProps = ComponentProps<typeof Image>;

const meta: Meta<StoryProps> = {
  component: Image,
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  args: {
    src: "https://ticketimage.interpark.com/Play/image/large/24/24013437_p.gif",
    className: "",
  },
  render: (args) => {
    return <Image {...args}></Image>;
  },
};

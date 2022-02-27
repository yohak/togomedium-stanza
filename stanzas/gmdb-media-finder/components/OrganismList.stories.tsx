import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps, FC, useEffect } from "react";
import { OrganismList } from "./OrganismList";
import { makeComponentStoryTitle } from "../../../utils/storybook";
import { LabelInfo } from "../../../utils/types";
import { useFoundOrganismsMutators } from "../states/foundOrganisms";

type WrapperProps = { organisms: LabelInfo[] } & ComponentProps<typeof OrganismList>;
const Wrapper: FC<WrapperProps> = (args) => {
  const { setFoundOrganisms } = useFoundOrganismsMutators();
  useEffect(() => {
    setFoundOrganisms(args.organisms);
  }, [args.organisms]);
  return <OrganismList {...args} />;
};

export default {
  title: makeComponentStoryTitle(OrganismList.name, "MediaFinder"),
  component: Wrapper,
} as ComponentMeta<typeof Wrapper>;

const Template: ComponentStory<typeof Wrapper> = (args) => <Wrapper {...args} />;

const defaultArgs: ComponentProps<typeof Wrapper> = {
  organisms: [
    {
      id: "abc",
      label: "hogehoge",
    },
    {
      id: "efg",
      label: "mogemoge",
    },
    {
      id: "hij",
      label: "fugafuga",
    },
  ],
};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };

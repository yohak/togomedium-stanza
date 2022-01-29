import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps, FC, useEffect } from "react";
import { HeaderRow } from "./HeaderRow";
import { makeComponentStoryTitle } from "../../../utils/storybook";
import { useIsMediaExpandedMutators } from "../states/isMediaExpanded";
import { useIsOrganismsExpandedMutators } from "../states/isOrganismsExpanded";

type WrapperProps = {
  isMediaExpanded: boolean;
  isOrganismsExpanded: boolean;
} & ComponentProps<typeof HeaderRow>;
const Wrapper: FC<WrapperProps> = (args) => {
  const { setIsMediaExpanded } = useIsMediaExpandedMutators();
  const { setIsOrganismsExpanded } = useIsOrganismsExpandedMutators();
  useEffect(() => {
    setIsMediaExpanded(args.isMediaExpanded);
  }, [args.isMediaExpanded]);
  useEffect(() => {
    setIsOrganismsExpanded(args.isOrganismsExpanded);
  }, [args.isOrganismsExpanded]);
  return <HeaderRow {...args} />;
};

export default {
  title: makeComponentStoryTitle(HeaderRow.name, "MediaAlignmentTable"),
  component: Wrapper,
} as ComponentMeta<typeof Wrapper>;

const Template: ComponentStory<typeof Wrapper> = (args) => <Wrapper {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isMediaExpanded: false,
  isOrganismsExpanded: false,
};

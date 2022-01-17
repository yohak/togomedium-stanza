import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps, FC, useEffect } from "react";
import { FooterRow } from "./FooterRow";
import { useIsMediaExpandedMutators } from "../states/isMediaExpanded";
import { useIsOrganismsExpandedMutators } from "../states/isOrganismsExpanded";

type WrapperProps = {
  isMediaExpanded: boolean;
  isOrganismsExpanded: boolean;
} & ComponentProps<typeof FooterRow>;
const Wrapper: FC<WrapperProps> = (args) => {
  const { setIsMediaExpanded } = useIsMediaExpandedMutators();
  const { setIsOrganismsExpanded } = useIsOrganismsExpandedMutators();
  useEffect(() => {
    setIsMediaExpanded(args.isMediaExpanded);
  }, [args.isMediaExpanded]);
  useEffect(() => {
    setIsOrganismsExpanded(args.isOrganismsExpanded);
  }, [args.isOrganismsExpanded]);
  return <FooterRow {...args} />;
};

export default {
  title: "Components/MediaAlignmentTable/FooterRow",
  component: Wrapper,
} as ComponentMeta<typeof Wrapper>;

const Template: ComponentStory<typeof Wrapper> = (args) => <Wrapper {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isMediaExpanded: false,
  isOrganismsExpanded: false,
  components: [
    {
      id: "ID of Distilled Water",
      level: 0,
      label: "Distilled Water",
      hasChildren: false,
      isOpen: false,
    },
    {
      id: "ID of Ager",
      level: 0,
      label: "Ager",
      hasChildren: true,
      isOpen: false,
    },
  ],
};

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps, FC, useEffect } from "react";
import { MediaRow } from "./MediaRow";
import { useIsMediaExpandedMutators } from "../states/isMediaExpanded";
import { useIsOrganismsExpandedMutators } from "../states/isOrganismsExpanded";

type WrapperProps = {
  isMediaExpanded: boolean;
  isOrganismsExpanded: boolean;
} & ComponentProps<typeof MediaRow>;
const Wrapper: FC<WrapperProps> = (args) => {
  const { setIsMediaExpanded } = useIsMediaExpandedMutators();
  const { setIsOrganismsExpanded } = useIsOrganismsExpandedMutators();
  useEffect(() => {
    setIsMediaExpanded(args.isMediaExpanded);
  }, [args.isMediaExpanded]);
  useEffect(() => {
    setIsOrganismsExpanded(args.isOrganismsExpanded);
  }, [args.isOrganismsExpanded]);
  return <MediaRow {...args} />;
};

export default {
  title: "MediaRow",
  component: Wrapper,
} as ComponentMeta<typeof Wrapper>;

const Template: ComponentStory<typeof Wrapper> = (args) => (
  <div style={{ display: "flex", backgroundColor: "black", flexDirection: "column", gap: 1 }}>
    <Wrapper {...args} />
  </div>
);

export const Type1 = Template.bind({});
Type1.args = {
  isMediaExpanded: false,
  isOrganismsExpanded: false,
  medium: { id: "HM_D00001a", label: "REACTIVATION WITH LIQUID MEDIUM 1" },
  organisms: [
    { id: "384676", label: "Pseudomonas entomophila L48" },
    { id: "643561", label: "Acidovorax avenae subsp. avenae ATCC 19860" },
  ],
  components: [
    {
      state: "available",
      id: "aaa",
      label: "hogehoge",
    },
    {
      state: "grouped",
      id: "bbb",
      label: "hogehoge",
    },
    {
      state: "none",
      id: "ccc",
      label: "hogehoge",
    },
  ],
};

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps, FC } from "react";
import { MediaRow } from "./MediaRow";
import { useIsMediaExpandedMutators } from "../states/isMediaExpanded";
import { useIsOrganismsExpandedMutators } from "../states/isOrganismsExpanded";

type WrapperType = {
  isMediaExpanded: boolean;
  isOrganismsExpanded: boolean;
} & ComponentProps<typeof MediaRow>;
const MediaRowWrapper: FC<WrapperType> = (props) => {
  const { setIsMediaExpanded } = useIsMediaExpandedMutators();
  const { setIsOrganismsExpanded } = useIsOrganismsExpandedMutators();
  setIsMediaExpanded(props.isMediaExpanded);
  setIsOrganismsExpanded(props.isOrganismsExpanded);
  return <MediaRow {...props} />;
};

export default {
  title: "MediaRow",
  component: MediaRow,
} as ComponentMeta<typeof MediaRow>;

const Template: ComponentStory<typeof MediaRow> = (args) => (
  <div style={{ display: "flex", backgroundColor: "black", flexDirection: "column", gap: 1 }}>
    <MediaRow {...args} />
  </div>
);

export const Type1 = Template.bind({});
Type1.args = {
  isMediaExpanded: false,
  isOrganismsExpanded: false,
  media: { id: "HM_D00001a", label: "REACTIVATION WITH LIQUID MEDIUM 1" },
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

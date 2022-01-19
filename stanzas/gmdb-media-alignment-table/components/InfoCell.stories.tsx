import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InfoCell } from "./InfoCell";
import { PATH_MEDIUM, PATH_ORGANISM } from "../../../components/consts";
import { makeComponentStoryTitle } from "../../../utils/storybook";

export default {
  title: makeComponentStoryTitle("InfoCell", "MediaAlignmentTable"),
  component: InfoCell,
} as ComponentMeta<typeof InfoCell>;

const Template: ComponentStory<typeof InfoCell> = (args) => <InfoCell {...args} />;

export const MediumCompact = Template.bind({});
MediumCompact.args = {
  expanded: false,
  info: [{ id: "HM_D00001a", label: "REACTIVATION WITH LIQUID MEDIUM 1" }],
  linkBase: PATH_MEDIUM,
};

export const MediumExpanded = Template.bind({});
MediumExpanded.args = {
  expanded: true,
  info: [{ id: "HM_D00001a", label: "REACTIVATION WITH LIQUID MEDIUM 1" }],
  linkBase: PATH_MEDIUM,
};

export const OrganismsCompact = Template.bind({});
OrganismsCompact.args = {
  expanded: false,
  info: [
    { id: "384676", label: "Pseudomonas entomophila L48" },
    { id: "643561", label: "Acidovorax avenae subsp. avenae ATCC 19860" },
  ],
  linkBase: PATH_ORGANISM,
};

export const OrganismsExpanded = Template.bind({});
OrganismsExpanded.args = {
  expanded: true,
  info: [
    { id: "384676", label: "Pseudomonas entomophila L48" },
    { id: "643561", label: "Acidovorax avenae subsp. avenae ATCC 19860" },
  ],
  linkBase: PATH_ORGANISM,
};

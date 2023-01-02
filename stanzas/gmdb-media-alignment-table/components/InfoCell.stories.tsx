import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InfoCell } from "./InfoCell";
import { PATH_MEDIUM, PATH_ORGANISM } from "../../../shared/components/consts";
import { makeComponentStoryTitle } from "../../../shared/utils/storybook";

export default {
  title: makeComponentStoryTitle(InfoCell.name, "MediaAlignmentTable"),
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
    { id: "169489", label: "Malassezia dermatis" },
  ],
  linkBase: PATH_ORGANISM,
};

export const OrganismsCompactWithPriority = Template.bind({});
OrganismsCompactWithPriority.args = {
  expanded: false,
  info: [
    { id: "384676", label: "Pseudomonas entomophila L48" },
    { id: "643561", label: "Acidovorax avenae subsp. avenae ATCC 19860" },
    { id: "169489", label: "Malassezia dermatis" },
  ],
  priority: ["169489", "643561"],
  linkBase: PATH_ORGANISM,
};

export const OrganismsCompactWithPriority2 = Template.bind({});
OrganismsCompactWithPriority2.args = {
  expanded: false,
  info: [
    { id: "384676", label: "Pseudomonas entomophila L48" },
    { id: "643561", label: "Acidovorax avenae subsp. avenae ATCC 19860" },
    { id: "169489", label: "Malassezia dermatis" },
  ],
  priority: ["abc", "bbb", "ddd"],
  linkBase: PATH_ORGANISM,
};

export const OrganismsExpanded = Template.bind({});
OrganismsExpanded.args = {
  expanded: true,
  info: [
    { id: "384676", label: "Pseudomonas entomophila L48" },
    { id: "643561", label: "Acidovorax avenae subsp. avenae ATCC 19860" },
    { id: "169489", label: "Malassezia dermatis" },
  ],
  linkBase: PATH_ORGANISM,
};

export const OrganismsExpandedWithPriority = Template.bind({});
OrganismsExpandedWithPriority.args = {
  expanded: true,
  info: [
    { id: "384676", label: "Pseudomonas entomophila L48" },
    { id: "643561", label: "Acidovorax avenae subsp. avenae ATCC 19860" },
    { id: "169489", label: "Malassezia dermatis" },
  ],
  linkBase: PATH_ORGANISM,
  priority: ["169489", "643561"],
};

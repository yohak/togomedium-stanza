import { Meta, StoryObj } from "@storybook/react";
import { InfoCell } from "./InfoCell";
import { PATH_MEDIUM, PATH_TAXON } from "../../../shared/components/consts";
import { makeComponentStoryTitle } from "../../../shared/utils/storybook";

const meta: Meta<typeof InfoCell> = {
  component: InfoCell,
};
export default meta;

type Story = StoryObj<typeof InfoCell>;
export const MediumCompact: Story = {
  args: {
    expanded: false,
    info: [{ id: "HM_D00001a", label: "REACTIVATION WITH LIQUID MEDIUM 1" }],
    linkBase: PATH_MEDIUM,
  },
};
export const MediumExpanded: Story = {
  args: {
    expanded: true,
    info: [{ id: "HM_D00001a", label: "REACTIVATION WITH LIQUID MEDIUM 1" }],
    linkBase: PATH_MEDIUM,
  },
};
export const OrganismsCompact: Story = {
  args: {
    expanded: false,
    info: [
      { id: "384676", label: "Pseudomonas entomophila L48" },
      { id: "643561", label: "Acidovorax avenae subsp. avenae ATCC 19860" },
      { id: "169489", label: "Malassezia dermatis" },
    ],
    linkBase: PATH_TAXON,
  },
};
export const OrganismsCompactWithPriority: Story = {
  args: {
    expanded: false,
    info: [
      { id: "384676", label: "Pseudomonas entomophila L48" },
      { id: "643561", label: "Acidovorax avenae subsp. avenae ATCC 19860" },
      { id: "169489", label: "Malassezia dermatis" },
    ],
    priority: ["169489", "643561"],
    linkBase: PATH_TAXON,
  },
};
export const OrganismsCompactWithPriority2: Story = {
  args: {
    expanded: false,
    info: [
      { id: "384676", label: "Pseudomonas entomophila L48" },
      { id: "643561", label: "Acidovorax avenae subsp. avenae ATCC 19860" },
      { id: "169489", label: "Malassezia dermatis" },
    ],
    priority: ["abc", "bbb", "ddd"],
    linkBase: PATH_TAXON,
  },
};
export const OrganismsExpanded: Story = {
  args: {
    expanded: true,
    info: [
      { id: "384676", label: "Pseudomonas entomophila L48" },
      { id: "643561", label: "Acidovorax avenae subsp. avenae ATCC 19860" },
      { id: "169489", label: "Malassezia dermatis" },
    ],
    linkBase: PATH_TAXON,
  },
};
export const OrganismsExpandedWithPriority: Story = {
  args: {
    expanded: true,
    info: [
      { id: "384676", label: "Pseudomonas entomophila L48" },
      { id: "643561", label: "Acidovorax avenae subsp. avenae ATCC 19860" },
      { id: "169489", label: "Malassezia dermatis" },
    ],
    linkBase: PATH_TAXON,
    priority: ["169489", "643561"],
  },
};

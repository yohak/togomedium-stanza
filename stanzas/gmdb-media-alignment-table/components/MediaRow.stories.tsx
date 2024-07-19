import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps, useEffect } from "react";
import { MediaRow } from "./MediaRow";
import { useIsMediaExpandedMutators } from "../states/isMediaExpanded";
import { useIsOrganismsExpandedMutators } from "../states/isOrganismsExpanded";

type WithCustomArgs = {
  isMediaExpanded: boolean;
  isOrganismsExpanded: boolean;
} & ComponentProps<typeof MediaRow>;
const meta: Meta<WithCustomArgs> = {
  component: MediaRow,
  decorators: [
    (StoryItem, { args }) => {
      const { isMediaExpanded, isOrganismsExpanded } = args;
      const { setIsMediaExpanded } = useIsMediaExpandedMutators();
      const { setIsOrganismsExpanded } = useIsOrganismsExpandedMutators();
      useEffect(() => {
        setIsMediaExpanded(isMediaExpanded);
      }, [isMediaExpanded]);
      useEffect(() => {
        setIsOrganismsExpanded(isOrganismsExpanded);
      }, [isOrganismsExpanded]);
      return (
        <div style={{ display: "flex", backgroundColor: "black", flexDirection: "column", gap: 1 }}>
          <StoryItem />
        </div>
      );
    },
  ],
};
export default meta;

type Story = StoryObj<WithCustomArgs>;
export const Type1: Story = {
  args: {
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
  },
};
export const NoOrganism: Story = {
  args: {
    isMediaExpanded: false,
    isOrganismsExpanded: false,
    medium: { id: "HM_D00001a", label: "REACTIVATION WITH LIQUID MEDIUM 1" },
    organisms: [],
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
  },
};

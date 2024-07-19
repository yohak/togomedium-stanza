import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps, useEffect } from "react";
import { HeaderRow } from "./HeaderRow";
import { useIsMediaExpandedMutators } from "../states/isMediaExpanded";
import { useIsOrganismsExpandedMutators } from "../states/isOrganismsExpanded";

type WithCustomArgs = {
  isMediaExpanded: boolean;
  isOrganismsExpanded: boolean;
} & ComponentProps<typeof HeaderRow>;
const meta: Meta<WithCustomArgs> = {
  component: HeaderRow,
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
      return <StoryItem />;
    },
  ],
};
export default meta;

type Story = StoryObj<WithCustomArgs>;
export const Primary: Story = {
  args: {
    isMediaExpanded: false,
    isOrganismsExpanded: false,
  },
};

import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps, useEffect } from "react";
import { FooterRow } from "./FooterRow";
import { useIsMediaExpandedMutators } from "../states/isMediaExpanded";
import { useIsOrganismsExpandedMutators } from "../states/isOrganismsExpanded";

type WithCustomArgs = {
  isMediaExpanded: boolean;
  isOrganismsExpanded: boolean;
} & ComponentProps<typeof FooterRow>;
const meta: Meta<WithCustomArgs> = {
  component: FooterRow,
  decorators: [
    (StoryItem, { args }) => {
      const { isMediaExpanded, isOrganismsExpanded } = args;
      const { setIsMediaExpanded } = useIsMediaExpandedMutators();
      const { setIsOrganismsExpanded } = useIsOrganismsExpandedMutators();
      useEffect(() => {
        setIsMediaExpanded(args.isMediaExpanded);
      }, [isMediaExpanded]);
      useEffect(() => {
        setIsOrganismsExpanded(args.isOrganismsExpanded);
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
  },
};

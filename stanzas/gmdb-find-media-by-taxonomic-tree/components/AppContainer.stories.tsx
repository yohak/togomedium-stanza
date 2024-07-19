import { Meta, StoryObj } from "@storybook/react";
import { AppContainer } from "./AppContainer";
import { mediaByAttributesMocks } from "../../../api/media_by_attributes/msw";
import { mediaByTaxonMocks } from "../../../api/media_by_taxon/msw";
import { organismsByPhenotypesMocks } from "../../../api/organisms_by_phenotypes/msw";
import { makeMswParameter } from "../../../shared/utils/storybook";

const meta: Meta<typeof AppContainer> = {
  component: AppContainer,
  parameters: {
    msw: makeMswParameter([
      ...mediaByAttributesMocks,
      ...mediaByTaxonMocks,
      ...organismsByPhenotypesMocks,
    ]),
  },
};
export default meta;

type Story = StoryObj<typeof AppContainer>;
export const Primary: Story = {};

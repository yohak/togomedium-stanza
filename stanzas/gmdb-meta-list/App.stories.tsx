import { Meta, StoryObj } from "@storybook/react";
import App from "./App";

// export default {
//   title: "Stanzas/MetaList",
//   component: App,
// } as ComponentMeta<typeof App>;
//
// const Template: ComponentStory<typeof App> = (args) => <App {...args} />;

const meta: Meta<typeof App> = {
  component: App,
};
export default meta;

type Story = StoryObj<typeof App>;
export const Media: Story = {
  args: {
    apiUrl: "https://togomedium.org/sparqlist/api/list_media",
    initialLimit: 20,
    title: "List Media",
    showColumnNames: true,
    columnSizes: [15, 15, 70],
    webFont: "Fira Sans Condensed",
  },
};
export const Strains: Story = {
  args: {
    apiUrl: "https://togomedium.org/sparqlist/api/list_strains",
    initialLimit: 20,
    title: "List Media",
    showColumnNames: true,
    columnSizes: [15, 15, 70],
    webFont: "Fira Sans Condensed",
  },
};

export const Components: Story = {
  args: {
    apiUrl: "https://togomedium.org/sparqlist/api/list_components",
    initialLimit: 100,
    title: "List Media",
    showColumnNames: true,
    columnSizes: [15, 15, 70],
    webFont: "Fira Sans Condensed",
  },
};

export const ChildItems: Story = {
  args: {
    apiUrl: "https://togomedium.org/sparqlist/api/gmdb_organism_under_rank_by_taxid?tax_id=293088",
    initialLimit: 10,
    title: "List Media",
    showColumnNames: true,
    columnSizes: [],
    webFont: "Fira Sans Condensed",
  },
};

export const SimilarMedia: Story = {
  args: {
    apiUrl: "https://togomedium.org/sparqlist/api/gmdb_list_similar_media_by_gmid?gm_id=M1",
    initialLimit: 10,
    title: "List similar media",
    showColumnNames: true,
    columnSizes: [],
    webFont: "Fira Sans Condensed",
  },
};

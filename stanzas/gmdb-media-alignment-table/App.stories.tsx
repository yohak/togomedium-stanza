import { ComponentMeta, ComponentStory } from "@storybook/react";
import { rest } from "msw";
import App from "./App";
import { mediaAlignmentTableResponse1 } from "../../api/media-alignment-table/response1";

export default {
  title: "Stanzas/MediaAlignmentTable",
  component: App,
  argTypes: { gmids: ["aaa"] },
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <App gmids={args.gmids} />;

export const Result1 = Template.bind({});
Result1.args = {
  gmids: ["HM_D00001a", "HM_D00065"],
};

Result1.parameters = {
  msw: {
    handlers: [
      rest.post(
        "http://growthmedium.org/sparqlist/api/gmdb_media_alignment_by_gmids",
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(mediaAlignmentTableResponse1));
        }
      ),
    ],
  },
};

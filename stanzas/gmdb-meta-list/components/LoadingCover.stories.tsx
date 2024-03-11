import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ComponentProps } from "react";
import { ListTable } from "./ListTable";
import { LoadingCover } from "./LoadingCover";
import { data1 } from "../../../api/all-media/data1";
import { StanzaWrapper } from "../../../shared/components/StanzaWrapper";
import { makeComponentStoryTitle } from "../../../shared/utils/storybook";

export default {
  title: makeComponentStoryTitle(LoadingCover.name, "MetaList"),
  component: LoadingCover,
  decorators: [
    (Story) => (
      <StanzaWrapper>
        <div style={{ position: "relative" }}>
          <ListTable data={data1} showColumnNames={true} columnSizes={[]} limit={20} />
          <Story />
        </div>
      </StanzaWrapper>
    ),
  ],
} as ComponentMeta<typeof LoadingCover>;

const Template: ComponentStory<typeof LoadingCover> = (args) => <LoadingCover {...args} />;

const defaultArgs: ComponentProps<typeof LoadingCover> = {
  isLoading: true,
  errorMessage: "",
};

export const Primary = Template.bind({});
Primary.args = { ...defaultArgs };

export const ErrorMessage = Template.bind({});
ErrorMessage.args = { ...defaultArgs, errorMessage: "Internal Server Error" };

export const Hidden = Template.bind({});
Hidden.args = { ...defaultArgs, isLoading: false };

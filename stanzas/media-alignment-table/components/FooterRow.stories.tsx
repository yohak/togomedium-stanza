import { ComponentMeta, ComponentStory } from "@storybook/react";
import { FooterRow } from "./FooterRow";

export default {
  title: "FooterRow",
  component: FooterRow,
} as ComponentMeta<typeof FooterRow>;

const Template: ComponentStory<typeof FooterRow> = (args) => <FooterRow {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isMediaExpanded: false,
  isOrganismsExpanded: false,
  components: [
    {
      id: "ID of Distilled Water",
      level: 0,
      label: "Distilled Water",
      hasChildren: false,
      isOpen: false,
      onClickFooterItem: (id) => console.log(id),
    },
    {
      id: "ID of Ager",
      level: 0,
      label: "Ager",
      hasChildren: true,
      isOpen: false,
      onClickFooterItem: (id) => console.log(id),
    },
  ],
};

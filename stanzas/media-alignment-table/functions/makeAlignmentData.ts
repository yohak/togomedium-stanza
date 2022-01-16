import { ComponentProps } from "react";
import { MediaAlignmentTableResponse } from "../../../api/media-alignment-table/types";
import { AlignmentCellState } from "../components/AlignmentCell";
import { FooterCell } from "../components/FooterCell";
import { MediaRow } from "../components/MediaRow";
import { LabelInfo, RawComponent, RawMedium, RawOrganism } from "../types";

type ComponentInfo = ComponentProps<typeof FooterCell>;
type CellProps = ComponentProps<typeof MediaRow>["components"][0];

export const makeAlignmentData = (
  data: MediaAlignmentTableResponse,
  footerComponents: ComponentInfo[]
): ComponentProps<typeof MediaRow>[] => {
  return data.media.map((medium) =>
    makeMediaRowProp(medium, data.organisms, data.components, footerComponents)
  );
};

const makeMediaRowProp = (
  mediumData: RawMedium,
  organismsData: RawOrganism[],
  componentsData: RawComponent[],
  footerList: ComponentInfo[]
): ComponentProps<typeof MediaRow> => {
  const medium: LabelInfo = {
    id: mediumData.gmid,
    label: mediumData.name,
  };
  const organisms: LabelInfo[] = mediumData.organisms.map(
    (taxid) =>
      organismsData
        .filter((organism) => organism.taxid === taxid)
        .map((organism) => ({ id: organism.taxid, label: organism.name }))[0]
  );
  const components: CellProps[] = footerList.map((data) => {
    return {
      id: data.id,
      label: data.label,
      state: findComponentState(data.id, mediumData.components, componentsData, footerList),
    };
  });
  return {
    medium,
    organisms,
    components,
  };
};

const findComponentState = (
  id: string,
  mediumComponents: string[],
  allComponents: RawComponent[],
  footerList: ComponentInfo[]
): AlignmentCellState => {
  if (mediumComponents.find((candidate) => candidate === id)) {
    return "available";
  }

  const groupedId = listChildComponents(id, allComponents).find((child) =>
    mediumComponents.find((candidate) => candidate === child)
  );
  if (groupedId) {
    const isOpen = footerList.find((item) => item.id === id)?.isOpen === true;
    return isOpen ? "grouped" : "available";
  }
  return "none";
};

const listChildComponents = (id: string, components: RawComponent[]): string[] => {
  const result: string[] = [];
  const addItem = (parentId: string) => {
    const children = components.filter((c) => c.parent === parentId).map((c) => c.gmoid);
    result.push(...children);
    children.forEach((c) => addItem(c));
  };
  addItem(id);
  return result;
};

export const __TEST__ = { listChildComponents };

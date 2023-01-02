import { css } from "@emotion/react";
import CircularProgress from "@mui/material/CircularProgress";
import React, { ComponentProps, FC, useEffect, useRef, useState } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { OrganismListItem } from "./OrganismListItem";
import { COLOR_GRAY700, COLOR_WHITE } from "../../../shared/components/styles";
import { deepEqual } from "../../../shared/utils/deepEqual";
import { useResetScroll } from "../hooks/useResetScroll";
import { useFoundOrganismsState } from "../states/foundOrganisms";
import { useIsOrganismLoading } from "../states/organismLoadAbort";
import {
  useSelectedOrganismsMutators,
  useSelectedOrganismsState,
} from "../states/selectedOrganisms";

type Props = {} & AcceptsEmotion;

type OrganismListInfo = Omit<ComponentProps<typeof OrganismListItem>, "onClick">;

export const OrganismList: FC<Props> = ({ css, className }) => {
  const isOrganismLoading = useIsOrganismLoading();
  const scrollInnerRef = useRef<HTMLDivElement>(null);
  const { data, toggleChecked } = useOrganismList();
  useResetScroll(scrollInnerRef, data);
  return (
    <div css={[organismList, css]} className={className}>
      {isOrganismLoading && (
        <div css={loadingIndicator}>
          <CircularProgress color="inherit" size={40} />
        </div>
      )}
      <div css={inner} ref={scrollInnerRef}>
        {data.map((item) => (
          <OrganismListItem key={item.id} {...item} onClick={toggleChecked} />
        ))}
      </div>
    </div>
  );
};

const organismList = css`
  background-color: ${COLOR_WHITE};
  position: relative;
  min-height: 100px;
`;

const inner = css`
  max-height: 100%;
  overflow-y: auto;
`;

const loadingIndicator = css`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.7);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${COLOR_GRAY700};
`;

const useOrganismList = () => {
  const [data, setData] = useState<OrganismListInfo[]>([]);
  const foundOrganisms = useFoundOrganismsState();
  const selectedOrganisms = useSelectedOrganismsState();
  const { toggleOrganismSelection } = useSelectedOrganismsMutators();
  const toggleChecked = (id: string) => {
    toggleOrganismSelection(id);
  };
  useEffect(() => {
    const result: OrganismListInfo[] = foundOrganisms.response.contents.map((organism) => {
      return {
        id: organism.tax_id,
        label: organism.name,
        isChecked: selectedOrganisms.includes(organism.tax_id),
      };
    });
    setData(result);
    // const updatedSelection = selectedOrganisms.filter((id) =>
    //   result.find((info) => info.id === id)
    // );
    // if (!deepEqual(updatedSelection, selectedOrganisms)) {
    //   setSelectedOrganisms(updatedSelection);
    // }
  }, [foundOrganisms, selectedOrganisms]);

  return { data, toggleChecked };
};

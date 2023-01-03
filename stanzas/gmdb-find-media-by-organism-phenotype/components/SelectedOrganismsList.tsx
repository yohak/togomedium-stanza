import { css } from "@emotion/react";
import React, { FC, useEffect, useState } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { OrganismListItem } from "./OrganismListItem";
import { MediaListItem } from "../../../shared/components/media-finder/MediaListItem";
import { Pagination } from "../../../shared/components/media-finder/Pagination";
import { useSelectedMediaMutators } from "../../../shared/state/selectedMedia";
import { LabelInfo } from "../../../shared/utils/labelInfo";
import {
  useSelectedOrganismsMutators,
  useSelectedOrganismsState,
} from "../states/selectedOrganisms";

type Props = {} & AcceptsEmotion;

const SHOW_COUNT = 10;
export const SelectedOrganismsList: FC<Props> = ({ css, className }) => {
  const selectedOrganisms = useSelectedOrganismsState();
  const { toggleOrganismSelection } = useSelectedOrganismsMutators();
  const [data, setData] = useState<LabelInfo[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const next = () => {
    setCurrent(current + SHOW_COUNT);
  };
  const prev = () => {
    setCurrent(current - SHOW_COUNT);
  };
  useEffect(() => {
    const filtered = selectedOrganisms
      .filter((item, i) => i >= current)
      .filter((item, i) => i < SHOW_COUNT);
    setData(filtered);
  }, [selectedOrganisms, current]);
  return (
    <div css={[selectedOrganismsList, css]} className={className}>
      <div>
        {data.map((item) => (
          <OrganismListItem
            key={item.id}
            {...item}
            isChecked={true}
            onClick={() => {
              toggleOrganismSelection(item);
            }}
          />
        ))}
      </div>
      {!!selectedOrganisms.length && (
        <Pagination
          total={selectedOrganisms.length}
          current={current}
          displayLength={SHOW_COUNT}
          onClickNext={next}
          onClickPrev={prev}
        />
      )}
    </div>
  );
};

const selectedOrganismsList = css``;

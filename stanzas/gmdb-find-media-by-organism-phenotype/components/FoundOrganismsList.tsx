import { css } from "@emotion/react";
import CircularProgress from "@mui/material/CircularProgress";
import React, { ComponentProps, FC, useEffect, useState } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { OrganismListItem } from "./OrganismListItem";
import {
  OrganismsByPhenotypeParams,
  OrganismsByPhenotypesResponse,
} from "../../../api/organisms_by_phenotypes/types";
import { API_ORGANISMS_BY_PHENOTYPES } from "../../../api/paths";
import { Pagination } from "../../../shared/components/media-finder/Pagination";
import {
  COLOR_GRAY700,
  COLOR_WHITE,
  FONT_WEIGHT_BOLD,
  SIZE1,
} from "../../../shared/components/styles";
import { getData } from "../../../shared/utils/getData";
import { hasIdOfLabel, LabelInfo } from "../../../shared/utils/labelInfo";
import { useFoundOrganismsMutators, useFoundOrganismsState } from "../states/foundOrganisms";
import { useIsOrganismLoading, useOrganismLoadAbortMutators } from "../states/organismLoadAbort";
import { usePhenotypeQueryState } from "../states/phenotypeQuery";
import {
  useSelectedOrganismsMutators,
  useSelectedOrganismsState,
} from "../states/selectedOrganisms";

type Props = {} & AcceptsEmotion;
type OrganismListInfo = Omit<ComponentProps<typeof OrganismListItem>, "onClick">;

const SHOW_COUNT = 10;
export const FoundOrganismsList: FC<Props> = ({ css, className }) => {
  const { data, toggleChecked, isLoading, response } = useOrganismList();
  const { next, prev } = usePaginate();

  return (
    <div css={[foundOrganismsList, css]} className={className}>
      <div>
        {isLoading && (
          <div css={loadingIndicator}>
            <CircularProgress color="inherit" size={40} />
          </div>
        )}
        <p css={infoTextCSS}>{getInfoText(response.total, isLoading)}</p>
        <div css={inner}>
          {data.map((item) => (
            <OrganismListItem key={item.id} {...item} onClick={toggleChecked} />
          ))}
        </div>
        {!!response.total && !isLoading && (
          <Pagination
            total={response.total}
            current={response.offset}
            displayLength={response.limit}
            onClickNext={() => next()}
            onClickPrev={() => prev()}
          />
        )}
      </div>
    </div>
  );
};

const usePaginate = () => {
  const response = useFoundOrganismsState();
  const { setNextOrganismLoadAbort } = useOrganismLoadAbortMutators();
  const phenotypeQuery = usePhenotypeQueryState();
  const { setFoundOrganisms } = useFoundOrganismsMutators();
  const next = () => {
    paginate(response.offset + SHOW_COUNT);
  };
  const prev = () => {
    paginate(response.offset - SHOW_COUNT);
  };
  const paginate = async (offset: number) => {
    const abort: AbortController = new AbortController();
    setNextOrganismLoadAbort(abort);
    const params: OrganismsByPhenotypeParams = {
      ...phenotypeQuery,
      limit: SHOW_COUNT,
      offset,
    };
    const response = await getData<OrganismsByPhenotypesResponse, OrganismsByPhenotypeParams>(
      API_ORGANISMS_BY_PHENOTYPES,
      params,
      abort
    );
    setNextOrganismLoadAbort(null);
    if (response.body) {
      setFoundOrganisms(response.body);
    }
  };

  return { next, prev };
};

const useOrganismList = () => {
  const [data, setData] = useState<OrganismListInfo[]>([]);
  const response = useFoundOrganismsState();
  const selectedOrganisms = useSelectedOrganismsState();
  const isLoading = useIsOrganismLoading();

  const { toggleOrganismSelection } = useSelectedOrganismsMutators();

  const toggleChecked = (info: LabelInfo) => {
    toggleOrganismSelection(info);
  };

  useEffect(() => {
    const result: OrganismListInfo[] = response.contents.map((organism) => {
      return {
        id: organism.tax_id,
        label: organism.name,
        isChecked: hasIdOfLabel(selectedOrganisms, organism.tax_id),
      };
    });
    setData(result);
  }, [response, selectedOrganisms]);

  return { data, toggleChecked, isLoading, response };
};

const getInfoText = (organismLength: number, isLoading: boolean): string => {
  if (isLoading) {
    return "Loading...";
  }
  if (organismLength === 0) {
    return "No organisms found";
  } else if (organismLength === 1) {
    return "1 organism found";
  } else {
    return `${organismLength} organisms found`;
  }
};

const foundOrganismsList = css`
  position: relative;
`;

const infoTextCSS = css`
  font-size: 18px;
  ${FONT_WEIGHT_BOLD};
  margin-bottom: ${SIZE1};
`;

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

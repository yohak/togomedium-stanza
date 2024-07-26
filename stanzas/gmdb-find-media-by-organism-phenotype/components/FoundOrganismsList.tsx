import { css } from "@emotion/react";
import CircularProgress from "@mui/material/CircularProgress";
import { useQuery } from "@tanstack/react-query";
import React, { ComponentProps, FC, useEffect, useState } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { OrganismListItem } from "./OrganismListItem";
import {
  OrganismsByPhenotypeParams,
  OrganismsByPhenotypesResponse,
} from "../../../api/organisms_by_phenotypes/types";
import { API_ORGANISMS_BY_PHENOTYPES } from "../../../api/paths";
import { Pagination } from "../../../shared/components/media-finder/Pagination";
import { COLOR_GRAY700, FONT_WEIGHT_BOLD, SIZE1 } from "../../../shared/styles/variables";
import { getData } from "../../../shared/utils/getData";
import { hasIdOfLabel, LabelInfo } from "../../../shared/utils/labelInfo";
import { FoundOrganisms } from "../states/foundOrganisms";
import { useOrganismTabFocusMutators } from "../states/organismTabFocus";
import { usePhenotypeQueryState } from "../states/phenotypeQuery";
import {
  useSelectedOrganismsMutators,
  useSelectedOrganismsState,
} from "../states/selectedOrganisms";

type Props = {} & AcceptsEmotion;
type OrganismListInfo = Omit<ComponentProps<typeof OrganismListItem>, "onClick">;

const SHOW_COUNT = 10;
export const FoundOrganismsList: FC<Props> = ({ css, className }) => {
  const { query, setPage } = useOrganismQuery();
  const { data, isLoading, isPlaceholderData } = query;
  const { list } = useOrganismList(data);
  const { toggleChecked } = useToggleSelection();

  return (
    <div css={[foundOrganismsList, css]} className={className}>
      <div>
        {(isLoading || isPlaceholderData) && (
          <div css={loadingIndicator}>
            <CircularProgress color="inherit" size={40} />
          </div>
        )}
        <p css={infoTextCSS}>{getInfoText(data?.total, isLoading)}</p>
        <div css={inner}>
          {(list ?? []).map((item) => (
            <OrganismListItem key={item.id} {...item} onClick={toggleChecked} />
          ))}
        </div>
        {!!data?.total && !isLoading && (
          <Pagination
            total={data.total}
            current={data.offset}
            displayLength={data.limit}
            onClickNext={() => setPage((prev) => prev + 1)}
            onClickPrev={() => setPage((prev) => prev - 1)}
          />
        )}
      </div>
    </div>
  );
};

const useOrganismQuery = () => {
  const [page, setPage] = useState(1);
  const { setOrganismTabFocus } = useOrganismTabFocusMutators();
  const phenotypeQueryParams = usePhenotypeQueryState();
  const nullResponse = { total: 0, contents: [], offset: 0, limit: 0 };
  useEffect(() => {
    setPage(1);
    // setOrganismTabFocus("Found organisms");
  }, [phenotypeQueryParams]);
  return {
    setPage,
    query: useQuery({
      queryKey: [phenotypeQueryParams, { page }],
      queryFn: async () => {
        if (Object.entries(phenotypeQueryParams).length === 0) return nullResponse;
        //
        const response = await getData<OrganismsByPhenotypesResponse, OrganismsByPhenotypeParams>(
          API_ORGANISMS_BY_PHENOTYPES,
          { ...phenotypeQueryParams, limit: SHOW_COUNT, offset: (page - 1) * SHOW_COUNT }
        );
        if (!response.body) throw new Error("No data");
        return response.body;
      },
      staleTime: Infinity,
      placeholderData: (previousData) => previousData,
    }),
  };
};

const useOrganismList = (response?: FoundOrganisms) => {
  const [list, setList] = useState<OrganismListInfo[]>([]);
  const selectedOrganisms = useSelectedOrganismsState();
  useEffect(() => {
    const result: OrganismListInfo[] = (response?.contents ?? []).map((organism) => {
      return {
        id: organism.tax_id,
        label: organism.name,
        isChecked: hasIdOfLabel(selectedOrganisms, organism.tax_id),
      };
    });
    setList(result);
  }, [response, selectedOrganisms]);
  return { list };
};

const useToggleSelection = () => {
  const { toggleOrganismSelection } = useSelectedOrganismsMutators();
  const toggleChecked = (info: LabelInfo) => {
    toggleOrganismSelection(info);
  };
  return { toggleChecked };
};

const getInfoText = (organismLength: number | undefined, isLoading: boolean): string => {
  if (isLoading) {
    return "Loading...";
  }
  if (!organismLength) {
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

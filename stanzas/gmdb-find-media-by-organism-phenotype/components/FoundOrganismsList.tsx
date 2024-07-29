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
import { hasIdOfLabel } from "../../../shared/utils/labelInfo";
import { MediaFinderListApiBody } from "../../../shared/utils/types";
import {
  useOrganismPaginationMutators,
  useOrganismPaginationState,
} from "../states/organismPagination";
import { usePhenotypeQueryState } from "../states/phenotypeQuery";
import {
  useSelectedOrganismsMutators,
  useSelectedOrganismsState,
} from "../states/selectedOrganisms";

type Props = {} & AcceptsEmotion;
type OrganismListInfo = Omit<ComponentProps<typeof OrganismListItem>, "onClick">;
type FoundOrganisms = MediaFinderListApiBody<"tax_id" | "name">;

export const FoundOrganismsList: FC<Props> = ({ css, className }) => {
  const { data, isLoading, isPlaceholderData } = useOrganismQuery();
  const { next, prev } = useOrganismPaginationMutators();
  const { list, toggleOrganismSelection } = useOrganismList(data);

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
            <OrganismListItem key={item.id} {...item} onClick={toggleOrganismSelection} />
          ))}
        </div>
        {!!data?.total && !isLoading && (
          <Pagination
            total={data.total}
            current={data.offset}
            displayLength={data.limit}
            onClickNext={next}
            onClickPrev={prev}
          />
        )}
      </div>
    </div>
  );
};

const SHOW_COUNT = 10;
const useOrganismQuery = () => {
  const page = useOrganismPaginationState();
  const phenotypeQueryParams = usePhenotypeQueryState();
  const nullResponse = { total: 0, contents: [], offset: 0, limit: 0 };
  return useQuery({
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
  });
};

const useOrganismList = (response?: FoundOrganisms) => {
  const [list, setList] = useState<OrganismListInfo[]>([]);
  const selectedOrganisms = useSelectedOrganismsState();
  const { toggleOrganismSelection } = useSelectedOrganismsMutators();
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
  return { list, toggleOrganismSelection };
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

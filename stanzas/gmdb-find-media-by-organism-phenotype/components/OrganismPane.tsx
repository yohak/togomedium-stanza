import { css } from "@emotion/react";
import React, { FC, useEffect } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { FoundOrganismsList } from "./FoundOrganismsList";
import { OrganismTab } from "./OrganismTab";
import { SelectedOrganismsList } from "./SelectedOrganismsList";
import { MediaByTaxonParams, MediaByTaxonResponse } from "../../../api/media_by_taxon/types";
import { API_MEDIA_BY_TAXON } from "../../../api/paths";
import { COLOR_WHITE, ROUNDED_CORNER, SIZE1, SIZE2 } from "../../../shared/components/styles";
import { nullResponse, useFoundMediaMutators } from "../../../shared/state/foundMedia";
import { useMediaLoadAbortMutators } from "../../../shared/state/mediaLoadAbort";
import { useQueryDataMutators } from "../../../shared/state/queryData";
import { getData } from "../../../shared/utils/getData";
import { extractLabelIds } from "../../../shared/utils/labelInfo";
import { useOrganismTabFocusState } from "../states/organismTabFocus";
import { useSelectedOrganismsState } from "../states/selectedOrganisms";

type Props = {} & AcceptsEmotion;

export const OrganismPane: FC<Props> = ({ css, className }) => {
  const organismTabFocus = useOrganismTabFocusState();
  useMediaLoadFromOrganismSelection();
  return (
    <div css={[wrapper, css]} className={className}>
      <OrganismTab />
      <div css={contents}>
        {organismTabFocus === "Found organisms" && <FoundOrganismsList />}
        {organismTabFocus === "Selected organisms" && <SelectedOrganismsList />}
      </div>
    </div>
  );
};

const useMediaLoadFromOrganismSelection = () => {
  const selectedOrganisms = useSelectedOrganismsState();
  const { setQueryData } = useQueryDataMutators();
  const { setFoundMedia } = useFoundMediaMutators();
  const { setNextMediaLoadAbort } = useMediaLoadAbortMutators();
  //
  const exec = async () => {
    const tax_ids = extractLabelIds(selectedOrganisms);
    const params: MediaByTaxonParams = { tax_ids, limit: 10, offset: 0 };
    setQueryData({ tax_ids });
    const abort: AbortController = new AbortController();
    setNextMediaLoadAbort(abort);
    const response = await getData<MediaByTaxonResponse, MediaByTaxonParams>(
      API_MEDIA_BY_TAXON,
      params,
      abort
    );
    setNextMediaLoadAbort(null);
    if (response.body) {
      setFoundMedia(response.body);
    }
  };
  useEffect(() => {
    if (selectedOrganisms.length === 0) {
      setQueryData({});
      setFoundMedia(nullResponse);
      setNextMediaLoadAbort(null);
      return;
    }
    exec();
  }, [selectedOrganisms]);
};

const wrapper = css`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  ${ROUNDED_CORNER};
  padding: ${SIZE1};
  background-color: ${COLOR_WHITE};
`;

const contents = css`
  padding: ${SIZE2} ${SIZE1};
  //background-color: #007bff;
  flex-grow: 1;
  overflow-y: auto;
`;

import { css } from "@emotion/react";
import React, { FC, useEffect } from "react";
import { TaxonomicTreeBranch } from "./TaxonomicTreeBranch";
import { MediaByTaxonParams, MediaByTaxonResponse } from "../../../api/media_by_taxon/types";
import { API_MEDIA_BY_TAXON } from "../../../api/paths";
import { getData } from "../../../utils/getData";
import { LabelInfo } from "../../../utils/types";
import { useInitTaxonTree } from "../hooks/useInitTaxonTree";
import { useFoundMediaMutators } from "../states/foundMedia";
import { useMediaLoadAbortMutators } from "../states/mediaLoadAbort";
import { useQueryDataMutators } from "../states/queryData";
import { useSelectedTaxonState } from "../states/selectedTaxon";

type Props = {};

export const TaxonomicTreeSection: FC<Props> = () => {
  useInitTaxonTree();
  useMediaLoadFromTaxon();
  return (
    <div css={[taxonomicTreeSection]}>
      <div>
        <TaxonomicTreeBranch id="2157" />
        <TaxonomicTreeBranch id="2" />
        <TaxonomicTreeBranch id="2759" />
      </div>
    </div>
  );
};

const taxonomicTreeSection = css`
  //overflow: scroll;
`;

const useMediaLoadFromTaxon = () => {
  const selectedTaxon = useSelectedTaxonState();
  const { setQueryData } = useQueryDataMutators();
  const { setFoundMedia } = useFoundMediaMutators();
  const { setNextMediaLoadAbort } = useMediaLoadAbortMutators();
  useEffect(() => {
    if (selectedTaxon.length === 0) {
      setQueryData({});
      setFoundMedia([]);
      setNextMediaLoadAbort(null);
      return;
    }
    (async () => {
      const params: MediaByTaxonParams = { tax_ids: selectedTaxon };
      setQueryData(params);
      const abort: AbortController = new AbortController();
      setNextMediaLoadAbort(abort);
      const response = await getData<MediaByTaxonResponse, MediaByTaxonParams>(
        API_MEDIA_BY_TAXON,
        params,
        abort
      );
      setNextMediaLoadAbort(null);
      if (response.body) {
        setFoundMedia(
          response.body.map<LabelInfo>((item) => ({
            id: item.gm_id,
            label: item.name,
          }))
        );
      }
    })();
  }, [selectedTaxon]);
};

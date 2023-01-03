import { css } from "@emotion/react";
import React, { FC, useEffect } from "react";
import { TaxonomicTreeBranch } from "./TaxonomicTreeBranch";
import { MediaByTaxonParams, MediaByTaxonResponse } from "../../../api/media_by_taxon/types";
import { API_MEDIA_BY_TAXON } from "../../../api/paths";
import { nullResponse, useFoundMediaMutators } from "../../../shared/state/media-finder/foundMedia";
import { useMediaLoadAbortMutators } from "../../../shared/state/media-finder/mediaLoadAbort";
import { useQueryDataMutators } from "../../../shared/state/media-finder/queryData";
import { getData } from "../../../shared/utils/getData";
import { useInitTaxonTree } from "../hooks/useInitTaxonTree";
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
      setFoundMedia(nullResponse);
      setNextMediaLoadAbort(null);
      return;
    }
    (async () => {
      const params: MediaByTaxonParams = { tax_ids: selectedTaxon, limit: 10, offset: 0 };
      setQueryData({ tax_ids: selectedTaxon });
      const abort: AbortController = new AbortController();
      setNextMediaLoadAbort(abort);
      const response = await getData<MediaByTaxonResponse, MediaByTaxonParams>(
        API_MEDIA_BY_TAXON,
        params,
        abort
      );
      setNextMediaLoadAbort(null);
      if (response.body) {
        setFoundMedia({ ...response.body });
      }
    })();
  }, [selectedTaxon]);
};

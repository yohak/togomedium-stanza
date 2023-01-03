import React, { FC, useEffect } from "react";
import { ComponentSelect } from "./ComponentSelect";
import {
  MediaByAttributesParams,
  MediaByAttributesResponse,
} from "../../../api/media_by_attributes/types";
import { API_MEDIA_BY_ATTRIBUTES } from "../../../api/paths";
import { nullResponse, useFoundMediaMutators } from "../../../shared/state/foundMedia";
import { useMediaLoadAbortMutators } from "../../../shared/state/mediaLoadAbort";
import { useQueryDataMutators } from "../../../shared/state/queryData";
import { getData } from "../../../shared/utils/getData";
import {
  useSelectedAttributesMutators,
  useSelectedAttributesState,
} from "../hooks/selectedAttributes";

type Props = {};

export const AttributesSection: FC<Props> = () => {
  const selectedAttributes = useSelectedAttributesState();
  const { setFoundMedia } = useFoundMediaMutators();
  const { setQueryData } = useQueryDataMutators();
  const { setNextMediaLoadAbort } = useMediaLoadAbortMutators();
  const { setSelectedAttributes } = useSelectedAttributesMutators();

  const onChangeSelection = (ids: string[]) => {
    setSelectedAttributes({ gmo_ids: ids });
  };

  useEffect(() => {
    const gmo_ids = selectedAttributes.gmo_ids;
    if (gmo_ids.length === 0) {
      setQueryData({});
      setFoundMedia(nullResponse);
      setNextMediaLoadAbort(null);
      return;
    }
    (async () => {
      const params: MediaByAttributesParams = { gmo_ids, limit: 10, offset: 0 };
      setQueryData({ gmo_ids });
      const abort: AbortController = new AbortController();
      setNextMediaLoadAbort(abort);
      const response = await getData<MediaByAttributesResponse, MediaByAttributesParams>(
        API_MEDIA_BY_ATTRIBUTES,
        params,
        abort
      );
      setNextMediaLoadAbort(null);
      if (response.body) {
        setFoundMedia(response.body);
      }
    })();
  }, [selectedAttributes]);
  return (
    <div>
      <ComponentSelect onChangeSelection={onChangeSelection} />
    </div>
  );
};

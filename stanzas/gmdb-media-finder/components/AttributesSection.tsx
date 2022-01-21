import React, { FC } from "react";
import { ComponentSelect } from "./ComponentSelect";
import {
  MediaByAttributesParams,
  MediaByAttributesResponse,
} from "../../../api/media_by_attributes/types";
import { API_MEDIA_BY_ATTRIBUTES } from "../../../api/paths";
import { LabelInfo } from "../../../components/types";
import { getData } from "../../../utils/getData";
import { useFoundMediaMutators } from "../states/foundMedia";
import { useQueryDataMutators } from "../states/queryData";

type Props = {};

export const AttributesSection: FC<Props> = () => {
  const { setFoundMedia } = useFoundMediaMutators();
  const { setQueryData } = useQueryDataMutators();
  const onChangeSelection = (ids: string[]) => {
    if (ids.length === 0) {
      setQueryData({});
      setFoundMedia([]);
      return;
    }
    (async () => {
      const params: MediaByAttributesParams = { gmo_ids: ids };
      setQueryData(params);
      //
      const response = await getData<MediaByAttributesResponse, MediaByAttributesParams>(
        API_MEDIA_BY_ATTRIBUTES,
        params
      );
      if (response.body) {
        setFoundMedia(
          response.body.map<LabelInfo>((item) => ({
            id: item.gm_id,
            label: item.name,
          }))
        );
      }
    })();
  };
  return (
    <div>
      <ComponentSelect onChangeSelection={onChangeSelection} />
    </div>
  );
};

import { Autocomplete, Chip, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { FC, SyntheticEvent, useState } from "react";
import { AllComponentsResponse } from "../../../api/all-components/types";
import { API_ALL_COMPONENTS } from "../../../api/paths";
import { getData } from "../../../utils/getData";
import { LabelInfo } from "../../../utils/types";

type Props = {
  onChangeSelection: (ids: string[]) => void;
};

export const ComponentSelect: FC<Props> = ({ onChangeSelection }) => {
  const [loading, setLoading] = useState(false);
  const onOpen = () => {
    if (components.length) return;
    setLoading(true);
    (async () => {
      const response = await getData<AllComponentsResponse>(API_ALL_COMPONENTS, {});
      if (response.body) {
        setComponents(
          response.body.map<LabelInfo>((item) => ({
            id: item.gmo_id,
            label: item.name,
          }))
        );
      }
      setLoading(false);
    })();
  };

  const [components, setComponents] = useState<readonly LabelInfo[]>([]);
  const onChange = (e: SyntheticEvent, value: LabelInfo[]) => {
    onChangeSelection(value.map((v) => v.id));
  };
  //
  return (
    <Autocomplete
      multiple
      filterSelectedOptions
      onChange={onChange}
      onOpen={onOpen}
      disablePortal={true}
      options={components}
      loading={loading}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Components"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant="outlined"
            {...getTagProps({ index })}
            label={option.label}
            key={option.id}
          />
        ))
      }
    />
  );
};

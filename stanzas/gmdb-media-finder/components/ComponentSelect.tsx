import { Autocomplete, Chip, TextField } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { FC, SyntheticEvent, useEffect, useState } from "react";
import { allComponentsResponse } from "../../../api/all-components/response";
import { LabelInfo } from "../../../components/types";
import { sleep } from "../../../utils/promise";

type Props = {
  onChangeSelection: (ids: string[]) => void;
};

export const ComponentSelect: FC<Props> = ({ onChangeSelection }) => {
  const [loading, setLoading] = useState(false);
  const onOpen = () => {
    if (components.length) return;
    setLoading(true);
    (async () => {
      await sleep(1e3);
      setComponents(allComponentsResponse.map((r) => ({ label: r.name, id: r.gmoid })));
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

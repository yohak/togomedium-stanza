import { css } from "@emotion/react";
import { Autocomplete, Chip, FormControl, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import React, { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { COLOR_WHITE } from "../../../components/styles";

type Props = {
  label: string;
  queryKey: string;
  items: [string, string][];
  handleEnabledChange: (key: string, enabled: boolean) => void;
  handleValueChange: (key: string, value: string) => void;
} & AcceptsEmotion;

export const SelectBox: FC<Props> = ({
  css,
  className,
  label,
  items,
  queryKey,
  handleEnabledChange,
  handleValueChange,
}) => {
  const [value, setValue] = useState("");
  const [enabled, setEnabled] = useState(false);

  const handleSelectChange = (event: SyntheticEvent, value: [string, string] | null) => {
    console.log(value);
    if (value) {
      setValue(value[1]);
    } else {
      setValue("");
    }
  };
  const handleCheckChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setEnabled(checked);
    setValue("");
  };
  useEffect(() => {
    if (enabled && value !== "") {
      handleValueChange(queryKey, value);
    } else {
      handleEnabledChange(queryKey, false);
    }
  }, [value, enabled]);

  return (
    <div css={[selectBox, css]} className={className}>
      <Checkbox css={checkBoxStyle} onChange={handleCheckChange} />
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <Autocomplete
          filterSelectedOptions
          onChange={handleSelectChange}
          disablePortal={true}
          disableClearable={true}
          options={items}
          disabled={enabled ? undefined : true}
          getOptionLabel={(item) => item[1]}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              InputProps={{
                ...params.InputProps,
                endAdornment: <>{params.InputProps.endAdornment}</>,
              }}
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                {...getTagProps({ index })}
                label={option[1]}
                key={option[0]}
              />
            ))
          }
        />
      </FormControl>
    </div>
  );
};

const selectBox = css`
  background-color: ${COLOR_WHITE};
  display: flex;
  align-items: center;
`;
const checkBoxStyle = css`
  padding-left: 0;
`;

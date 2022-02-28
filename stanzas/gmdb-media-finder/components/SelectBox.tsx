import { css } from "@emotion/react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
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

  const handleSelectChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
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
        <InputLabel id={queryKey}>{label}</InputLabel>
        <Select
          labelId={queryKey}
          id={queryKey}
          value={value}
          label={label}
          onChange={handleSelectChange}
          disabled={enabled ? undefined : true}
        >
          {items.map(([value, name]) => (
            <MenuItem key={value} value={value}>
              {name}
            </MenuItem>
          ))}
        </Select>
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

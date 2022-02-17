import { css } from "@emotion/react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import React, { ChangeEvent, FC, useState } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { COLOR_WHITE } from "../../../components/styles";

type Props = {
  label: string;
  labelId: string;
  items: [string, string][];
} & AcceptsEmotion;

export const SelectBox: FC<Props> = ({ css, className, label, labelId, items }) => {
  const [value, setValue] = useState("");
  const [enabled, setEnabled] = useState(false);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };
  const handleCheckChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setEnabled(checked);
    setValue("");
  };

  return (
    <div css={[selectBox, css]} className={className}>
      <Checkbox css={checkBoxStyle} onChange={handleCheckChange} />
      <FormControl sx={{ m: 1, minWidth: 300 }}>
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select
          labelId={labelId}
          id={labelId}
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

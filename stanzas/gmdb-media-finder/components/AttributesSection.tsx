import { Autocomplete, FormControl, InputLabel, Select, TextField } from "@mui/material";
import React, { FC } from "react";
import { LabelInfo } from "../../../components/types";

type Props = {};

const components: LabelInfo[] = [
  {
    id: "a",
    label: "aaaaaa",
  },
  {
    id: "b",
    label: "bbbbb",
  },
  {
    id: "c",
    label: "ccccc",
  },
  {
    id: "d",
    label: "ddddd",
  },
];

export const AttributesSection: FC<Props> = () => {
  return (
    <div>
      <Autocomplete
        multiple
        disablePortal={true}
        options={components}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => <TextField {...params} label="Components" />}
      />
    </div>
  );
};

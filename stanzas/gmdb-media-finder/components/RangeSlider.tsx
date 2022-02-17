import { css } from "@emotion/react";
import { Mark } from "@mui/base/SliderUnstyled/SliderUnstyled";
import { FormControlLabel } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Slider from "@mui/material/Slider";
import React, { ChangeEvent, FC, useState } from "react";
import { AcceptsEmotion } from "yohak-tools";

type Props = {
  min: number;
  max: number;
  label: string;
  marks: Mark[];
} & AcceptsEmotion;

function valuetext(value: number) {
  return `${value}°C`;
}

export const RangeSlider: FC<Props> = ({ css, className, min, max, label, marks }) => {
  const [value, setValue] = useState<number[]>([min, max]);
  const [enabled, setEnabled] = useState(false);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  const handleCheckChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setEnabled(checked);
  };
  return (
    <div css={[rangeSlider, css]} className={className}>
      <div>
        <span>
          <FormControlLabel
            label={label}
            control={<Checkbox onChange={handleCheckChange} css={checkBoxStyle} />}
          />
        </span>
      </div>
      <Slider
        value={value}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={min}
        max={max}
        marks={marks}
        step={0.1}
        disabled={enabled ? undefined : true}
      />
    </div>
  );
};

const rangeSlider = css``;
const checkBoxStyle = css`
  padding-left: 0;
`;

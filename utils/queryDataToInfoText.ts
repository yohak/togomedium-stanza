import { isArray } from "yohak-tools/";
import { QueryData } from "../shared/state/queryData";

export const queryDataToInfoText = (data: QueryData): string => {
  return Object.entries(data)
    .map(([key, value]) => {
      let valueText: string;
      if (isArray(value)) {
        valueText = value.join(", ");
      } else {
        valueText = value ?? "";
      }
      return `${key}${valueText ? ":" : ""}${valueText}`;
    })
    .join(" / ");
};

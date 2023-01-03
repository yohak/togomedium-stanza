import { isArray } from "yohak-tools/";
import { QueryData } from "../state/media-finder/queryData";

export const queryDataToInfoText = (data: QueryData | null): string => {
  if (!data) {
    return "";
  }
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

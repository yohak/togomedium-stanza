import { SerializedStyles } from "@emotion/serialize";
import { Optional } from "yohak-tools";

export type AcceptsEmotion = {
  css?: SerializedStyles;
  className?: string;
};

export type TemplateBase = {
  isLoading?: boolean;
  error?: boolean;
  status?: number;
  statusText?: string;
};

export type SimpleObject = { [key: string]: string | number | string[] | number[] };

export type ApiResponse<T> = {
  status: number;
  message?: string;
  body: Optional<T>;
};

import { SerializedStyles } from "@emotion/serialize";
import { Optional } from "yohak-tools";

export type Layout = {
  extraCSS?: SerializedStyles;
};

export type TemplateBase = {
  isLoading?: boolean;
  error?: boolean;
  status?: number;
  statusText?: string;
};

export type SimpleObject = { [key: string]: string | number };

export type ApiResponse<T> = {
  status: number;
  message?: string;
  body: Optional<T>;
};

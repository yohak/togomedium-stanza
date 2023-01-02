import { SerializedStyles } from "@emotion/serialize";
import { Nullable, Optional } from "yohak-tools";

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
export type LabelInfo = {
  label: string;
  id: string;
};

export type TreeBranch = {
  name: string;
  id: string;
  level: number;
  children: TreeBranch[];
};

export type TreeTrunk = TreeBranch[];

import { Optional } from "yohak-tools";

export type AcceptsEmotion = {
  css?: any;
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

export type MediaFinderListApiBody<T extends string = string> = {
  limit: number;
  total: number;
  offset: number;
  contents: { [Key in T]: string }[];
};

export type TreeBranch = {
  name: string;
  id: string;
  level: number;
  children: TreeBranch[];
};

export type TreeTrunk = TreeBranch[];

type ApiBody = {
  total: number;
  offset: number;
  limit: number;
  contents: Content[];
  columns: Column[];
};

type Content = Record<string, LinkItem | string>;

type LinkItem = {
  href: string;
  label: string;
};

type Column = {
  key: string;
  label: string;
  nowrap?: boolean;
  size?: number;
};

export type ListApiBody = ApiBody;

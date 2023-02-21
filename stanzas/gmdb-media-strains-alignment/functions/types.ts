import { Nullable } from "yohak-tools";

export type CellInfo = {
  label: string;
  id: string;
  size: number;
};
export type DisplayData = {
  media: CellInfo[];
  taxon: Record<LineageRank, CellInfo[][]>;
};

export const lineageRanks = [
  "superkingdom",
  "phylum",
  "class",
  "order",
  "family",
  "genus",
  "species",
] as const;
export type LineageRank = (typeof lineageRanks)[number];

export type Medium = {
  gm_id: string;
  label: string;
  strains: string[];
};
export type Taxon = {
  id: string;
  label: string;
};
export type Lineage = Record<LineageRank, Nullable<Taxon>>;
export type Strain = {
  lineage: Lineage;
} & Taxon;

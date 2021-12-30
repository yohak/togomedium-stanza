export enum TAXON_RANK {
  _0_KINGDOM = "Kingdom",
  _1_PHYLUM = "Phylum",
  _2_CLASS = "Class",
  _3_ORDER = "Order",
  _4_FAMILY = "Family",
  _5_TRIBE = "Tribe",
  _6_GENUS = "Genus",
  _7_SECTION = "Section",
  _8_SERIES = "Series",
  _9_SPECIES = "Species",
  _10_VARIETY = "Variety",
  _11_FORM = "Form",
}

export const availableRanks: TAXON_RANK[] = [
  TAXON_RANK._0_KINGDOM,
  TAXON_RANK._1_PHYLUM,
  TAXON_RANK._2_CLASS,
  TAXON_RANK._3_ORDER,
  TAXON_RANK._4_FAMILY,
  TAXON_RANK._6_GENUS,
  TAXON_RANK._9_SPECIES,
];

export const getRankLevel = (rank: TAXON_RANK): number => {
  return availableRanks.indexOf(rank);
};

export const getNextTaxon = (rank: TAXON_RANK): TAXON_RANK | undefined => {
  const rankLevel = getRankLevel(rank);
  if (rankLevel === -1) {
    return undefined;
  }
  return availableRanks[rankLevel + 1];
};

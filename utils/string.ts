import { Optional } from "yohak-tools";

export const unescapeJsonString = (str: Optional<string>): Optional<string> => {
  return str?.replace(/\\/g, "");
};

export const capitalizeFirstLetter = (str: Optional<string>): Optional<string> => {
  if (!str) {
    return str;
  }
  const reg = /^(.)(.*)$/.exec(str);
  // console.log(reg);
  return `${reg![1].toUpperCase()}${reg![2]}`;
};

export const makeTogoGenomeOrganismLink = (taxid: Optional<string>): Optional<string> => {
  if (!taxid) {
    return taxid;
  }
  return `http://togogenome.org/organism/${taxid}`;
};

export const makeNcbiOrganismLink = (taxid: Optional<string>): Optional<string> => {
  if (!taxid) {
    return taxid;
  }
  return `https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?mode=Info&id=${taxid}`;
};

export const stringToArray = (str: string): string[] => {
  return str.split(",").map((str) => str.trim());
};

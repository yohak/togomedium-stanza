export const unescapeJsonString = (str: string): string => {
  return str?.replace(/\\/g, "");
};

export const capitalizeFirstLetter = (str: string): string => {
  if (!str) {
    return str;
  }
  const reg = /^(.)(.*)$/.exec(str);
  // console.log(reg);
  return `${reg[1].toUpperCase()}${reg[2]}`;
};

export const makeTogoGenomeOrganismLink = (taxid: string): string => {
  if (!taxid) {
    return taxid;
  }
  return `http://togogenome.org/organism/${taxid}`;
};

export const makeNcbiOrganismLink = (taxid: string): string => {
  if (!taxid) {
    return taxid;
  }
  return `https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?mode=Info&id=${taxid}`;
};

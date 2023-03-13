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

export const convertHTMLEntity = (text: string) => {
  const span = document.createElement("span");

  return text.replace(/&[#A-Za-z0-9]+;/gi, (entity, position, text) => {
    span.innerHTML = entity;
    console.log("converted", text, span.innerText);
    return span.innerText;
  });
};

export const makeSpeciesName = (str: string) => {
  const arr = str.split(" ");
  if (arr.length < 1) {
    return "";
  }
  const first = arr.shift()!.replace("[", "").charAt(0).toUpperCase();

  const rest = capitalizeFirstLetter(arr.join(" "));

  return `${first}. ${rest}`;
};

export const makeStrainName = (str: string) => {
  const arr = str.split(" ");
  if (arr.length < 2) {
    return "";
  }
  const first = arr.shift()!.charAt(0).toUpperCase();
  const second = arr.shift()!.charAt(0).toUpperCase();
  const rest = capitalizeFirstLetter(arr.join(" "));

  return `${first}. ${second}. ${rest}`;
};

export const decodeHTMLEntities = (text: string): string => {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
};

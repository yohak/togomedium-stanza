const unescapeJsonString = (str) => {
    return str === null || str === void 0 ? void 0 : str.replace(/\\/g, "");
};
const capitalizeFirstLetter = (str) => {
    if (!str) {
        return str;
    }
    const reg = /^(.)(.*)$/.exec(str);
    return `${reg[1].toUpperCase()}${reg[2]}`;
};
const makeTogoGenomeOrganismLink = (taxid) => {
    if (!taxid) {
        return taxid;
    }
    return `http://togogenome.org/organism/${taxid}`;
};
const makeNcbiOrganismLink = (taxid) => {
    if (!taxid) {
        return taxid;
    }
    return `https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?mode=Info&id=${taxid}`;
};
const stringToArray = (str) => {
    return str.split(",").map((str) => str.trim());
};

export { makeNcbiOrganismLink as a, capitalizeFirstLetter as c, makeTogoGenomeOrganismLink as m, stringToArray as s, unescapeJsonString as u };
//# sourceMappingURL=string-ad764b4c.js.map

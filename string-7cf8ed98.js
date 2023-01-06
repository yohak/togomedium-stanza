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
const convertHTMLEntity = (text) => {
    const span = document.createElement("span");
    return text.replace(/&[#A-Za-z0-9]+;/gi, (entity, position, text) => {
        span.innerHTML = entity;
        console.log("converted", text, span.innerText);
        return span.innerText;
    });
};

export { capitalizeFirstLetter as a, makeNcbiOrganismLink as b, convertHTMLEntity as c, makeTogoGenomeOrganismLink as m, stringToArray as s, unescapeJsonString as u };
//# sourceMappingURL=string-7cf8ed98.js.map

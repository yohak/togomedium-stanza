const importWebFontForTogoMedium = (stanza, name = "Fira Sans Condensed") => {
    name = name.replace(/ /gi, "+");
    stanza.importWebFontCSS(`https://fonts.googleapis.com/css2?family=${name}:wght@400;500;700`);
};

export { importWebFontForTogoMedium as i };
//# sourceMappingURL=stanza-4b95c663.js.map

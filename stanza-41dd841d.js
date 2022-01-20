const importWebFontForTogoMedium = (stanza, name = "Fira Sans Condensed") => {
    name = name.replace(/ /gi, "+");
    stanza.importWebFontCSS(`https://fonts.googleapis.com/css2?family=${name}:wght@300;400;600&display=swap`);
};

export { importWebFontForTogoMedium as i };
//# sourceMappingURL=stanza-41dd841d.js.map

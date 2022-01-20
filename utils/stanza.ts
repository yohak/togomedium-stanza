import Stanza from "togostanza/stanza";

export const importWebFontForTogoMedium = (
  stanza: Stanza,
  name: string = "Fira Sans Condensed"
) => {
  name = name.replace(/ /gi, "+");
  stanza.importWebFontCSS(
    `https://fonts.googleapis.com/css2?family=${name}:wght@400;500;700&display=swap`
  );
};

import { TemplateBase } from "../../utils/types";
import { importWebFontForTogoMedium } from "../../utils/stanza";

export default async function gmdbPhenotypeInfo(
  stanza: StanzaInstance,
  params: StanzaParameters
) {
  if (!params.tax_id) {
    return;
  }
  stanza.render<TemplateParameters>({
    template: "stanza.html.hbs",
    parameters: null,
  });
  importWebFontForTogoMedium(stanza);
}

type StanzaParameters = {
  tax_id: string;
};

type TemplateParameters = {} & PhenotypeInfo & TemplateBase;

type PhenotypeInfo = {
  cell_shape: string;
  temperature_range: string;
  motility: string;
  staining: string;
  energy_source: string;
};

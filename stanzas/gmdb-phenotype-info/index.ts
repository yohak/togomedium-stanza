import Stanza from "togostanza/stanza";
import { importWebFontForTogoMedium } from "../../shared/utils/stanza";
import { TemplateBase } from "../../shared/utils/types";

export default class GmdbPhenotypeInfo extends Stanza<StanzaParameters> {
  async render() {
    const params = this.params;
    if (!params.tax_id) {
      return;
    }
    const template = "stanza.html.hbs";
    this.renderTemplate<TemplateParameters>({ template });
    importWebFontForTogoMedium(this);
  }
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

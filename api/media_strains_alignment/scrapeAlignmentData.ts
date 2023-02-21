import { MediaStrainsAlimentResponse } from "./types";
import {
  Lineage,
  lineageRanks,
  Strain,
} from "../../stanzas/gmdb-media-strains-alignment/functions/types";
const fetch = require("node-fetch");
const sleep = require("sleep-promise");

export const scrapeAlignmentData = async (
  ...gm_ids: string[]
): Promise<MediaStrainsAlimentResponse> => {
  const result: MediaStrainsAlimentResponse = {
    media: [],
    strains: [],
  };
  for await (const gmId of gm_ids) {
    const infoResponse = await fetch(
      `http://growthmedium.org/sparqlist/api/gmdb_medium_by_gmid?gm_id=${gmId}`
    );
    const infoData = await infoResponse.json();
    const name = infoData.meta.name;
    await sleep(200);
    const contentsResponse = await fetch(
      `http://growthmedium.org/sparqlist/api/gmdb_organisms_by_gmid?gm_id=${gmId}&limit=100`
    );
    const contentsData = await contentsResponse.json();
    const contents = contentsData.contents;
    result.media.push({
      label: name,
      gm_id: gmId,
      strains: contents.map((content: any) => content.tax_id.label),
    });

    for await (const content of contents) {
      await sleep(200);
      const res = await fetch(
        `http://growthmedium.org/sparqlist/api/gmdb_organism_by_taxid?tax_id=${content.tax_id.label}`
      );
      const data = await res.json();
      const d: any[] = data.lineage;
      const lineage: Partial<Lineage> = {};
      lineageRanks.forEach((key) => {
        const l = d.find((item) => item.rank === key);
        lineage[key] = l
          ? {
              id: l.taxid.toString(),
              label: l.label,
            }
          : null;
      });
      lineage.species = {
        id: content.tax_id.label,
        label: content.name,
      };
      const strain: Strain = {
        id: content.tax_id.label,
        label: content.name,
        lineage: lineage as Lineage,
      };
      result.strains.push(strain);
    }
  }
  result.strains = shuffle(result.strains);
  return result;
};

(async () => {
  const result = await scrapeAlignmentData("JCM_M333", "JCM_M54", "JCM_M55");
  console.log(JSON.stringify(result));
})();

export function shuffle<T extends any>(array: T[]): T[] {
  const _array = [...array];
  let currentIndex = _array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [_array[currentIndex], _array[randomIndex]] = [_array[randomIndex], _array[currentIndex]];
  }

  return _array;
}

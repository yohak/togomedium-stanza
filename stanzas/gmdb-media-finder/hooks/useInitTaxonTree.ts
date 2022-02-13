import { useEffect } from "react";
import { retrieveTaxonInfo } from "../functions/proessTaxonInfo";
import { TaxonInfo, useTaxonListMutators } from "../states/taxonList";

export const useInitTaxonTree = () => {
  const { addTaxonToList } = useTaxonListMutators();
  useEffect(() => {
    superkingdoms.forEach((info) => retrieveTaxonInfo(info, addTaxonToList));
  }, []);
};

const superkingdoms: TaxonInfo[] = [
  {
    id: "2157",
    label: "Archaea",
    rank: "Superkingdom",
    children: null,
  },
  {
    id: "2",
    label: "Bacteria",
    rank: "Superkingdom",
    children: null,
  },
  {
    id: "2759",
    label: "Eukaryota",
    rank: "Superkingdom",
    children: null,
  },
];

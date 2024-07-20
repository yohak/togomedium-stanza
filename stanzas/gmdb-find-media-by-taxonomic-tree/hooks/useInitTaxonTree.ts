import { useEffect } from "react";
import { TaxonInfo, useTaxonListMutators } from "../states/taxonList";

export const useInitTaxonTree = () => {
  const { addTaxonToList } = useTaxonListMutators();
  useEffect(() => {
    superkingdoms.forEach((info) => {
      addTaxonToList(info);
    });
  }, [addTaxonToList]);
};

const superkingdoms: TaxonInfo[] = [
  {
    id: "2157",
    label: "Archaea",
    rank: "Superkingdom",
    children: "not-yet",
  },
  {
    id: "2",
    label: "Bacteria",
    rank: "Superkingdom",
    children: "not-yet",
  },
  {
    id: "2759",
    label: "Eukaryota",
    rank: "Superkingdom",
    children: "not-yet",
  },
];

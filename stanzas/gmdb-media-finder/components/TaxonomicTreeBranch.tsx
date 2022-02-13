import { css } from "@emotion/react";
import React, { FC, useEffect, useState } from "react";
import { AcceptsEmotion, Optional } from "yohak-tools";
import { CheckStatus, TreeBranchView } from "./TreeBranchView";
import {
  findAscendants,
  findDescendants,
  findSiblings,
  retrieveTaxonInfo,
} from "../functions/proessTaxonInfo";
import { useSelectedTaxonMutators, useSelectedTaxonState } from "../states/selectedTaxon";
import { TaxonInfo, useTaxonListMutators, useTaxonListState } from "../states/taxonList";

type Props = { id: string } & AcceptsEmotion;

export const TaxonomicTreeBranch: FC<Props> = ({ id, css, className }) => {
  const taxonList = useTaxonListState();
  const { taxChildren, label, rank } = useTaxChildren(id, taxonList);
  const { descendants, ascendants } = useLineages(id, taxonList);
  const { check, onClickCheck } = useChecked(id, taxonList, ascendants, descendants);
  const { ascendantsLabel } = useAscendantsLabel(ascendants);
  const [linkString, linkURL] = useLinkString(id);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onToggleChildren = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <TreeBranchView
      css={css}
      className={className}
      label={label}
      id={id}
      tag={rank}
      linkString={linkString}
      linkURL={linkURL}
      toolTipLabel={ascendantsLabel}
      check={check}
      hasChildren={!!taxChildren.length}
      isOpen={isOpen}
      onClickCheck={() => onClickCheck()}
      onToggleChildren={onToggleChildren}
    >
      {isOpen &&
        taxChildren.length &&
        taxChildren.map((childId) => <TaxonomicTreeBranch key={childId} id={childId} />)}
    </TreeBranchView>
  );
};

const useLinkString = (id: string) => {
  const [linkString, setLinkString] = useState<string>("");
  const [linkURL, setLinkURL] = useState<string>("");
  useEffect(() => {
    setLinkString(`taxid:${id}`);
    setLinkURL(`http://growthmedium.org/organism/${id}`);
  }, [id]);
  return [linkString, linkURL];
};

const useTaxChildren = (id: string, taxonList: TaxonInfo[]) => {
  const { addTaxonToList } = useTaxonListMutators();
  const [taxChildren, setTaxChildren] = useState<string[]>([]);
  const [rank, setRank] = useState("");
  const [label, setLabel] = useState("");
  useEffect(() => {
    const myInfo: Optional<TaxonInfo> = taxonList.find((taxon) => taxon.id === id);
    if (myInfo && myInfo.children?.length !== taxChildren.length) {
      setRank(myInfo.rank);
      setLabel(myInfo.label);
      setTaxChildren(myInfo.children ?? []);
    }
  }, [id, taxonList]);

  useEffect(() => {
    if (!taxChildren.length) return;
    taxChildren.forEach((id) => {
      const childInfo: Optional<TaxonInfo> = taxonList.find((taxon) => taxon.id === id);
      if (childInfo?.children === null) {
        retrieveTaxonInfo(childInfo, addTaxonToList);
      }
    });
  }, [taxChildren]);
  return { taxChildren, rank, label };
};

const useChecked = (
  id: string,
  taxonList: TaxonInfo[],
  ascendants: string[],
  descendants: string[]
) => {
  const selectedTaxon = useSelectedTaxonState();
  const { toggleTaxonSelect, setTaxonSelect } = useSelectedTaxonMutators();
  const [check, setCheck] = useState<CheckStatus>("none");
  const onClickCheck = () => {
    setTaxonSelect(descendants, false);
    //
    const directSiblings = findSiblings(taxonList, id);
    const checkedSiblings = directSiblings.filter((taxId) => selectedTaxon.includes(taxId));
    if (
      check === "none" &&
      checkedSiblings.length > 0 &&
      checkedSiblings.length === directSiblings.length
    ) {
      setTaxonSelect(directSiblings, false);
      setTaxonSelect([ascendants.reverse()[0]], true);
    } else if (check === "grouped") {
      setTaxonSelect(ascendants, false);
      const lineages = [...ascendants, id].reverse();
      for (let i = 0; i < lineages.length; i++) {
        const taxId = lineages[i];
        const siblings = findSiblings(taxonList, taxId);
        if (siblings) {
          setTaxonSelect(siblings, true);
          break;
        }
      }
    } else {
      toggleTaxonSelect(id);
    }
  };

  useEffect(() => {
    const isChecked: boolean = !!selectedTaxon.find((taxId) => taxId === id);
    const isGrouped: boolean = !!selectedTaxon.find((taxId) => ascendants.includes(taxId));
    const isIndeterminate: boolean = !!selectedTaxon.find((taxId) => descendants.includes(taxId));
    switch (true) {
      case isChecked:
        setCheck("checked");
        break;
      case isGrouped:
        setCheck("grouped");
        break;
      case isIndeterminate:
        setCheck("indeterminate");
        break;
      default:
        setCheck("none");
    }
  }, [selectedTaxon, descendants, ascendants, id]);
  return { check, onClickCheck };
};

const useLineages = (id: string, taxonList: TaxonInfo[]) => {
  const [ascendants, setAscendants] = useState<string[]>([]);
  const [descendants, setDescendants] = useState<string[]>([]);
  const [siblings, setSiblings] = useState<string[]>([]);

  useEffect(() => {
    setAscendants(findAscendants(taxonList, id));
    setDescendants(findDescendants(taxonList, id));
    setSiblings(findSiblings(taxonList, id));
  }, [taxonList, id]);

  return { ascendants, descendants, siblings };
};

const useAscendantsLabel = (ascendants: string[]) => {
  const [label, setLabel] = useState<string>("");
  const taxonList = useTaxonListState();
  useEffect(() => {
    setLabel(ascendants.map((id) => taxonList.find((taxon) => taxon.id === id)?.label).join(" > "));
  }, [ascendants]);
  return { ascendantsLabel: label };
};

const taxonomicTreeBranch = css``;

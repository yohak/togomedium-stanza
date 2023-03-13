import { css } from "@emotion/react";
import React, { FC, useEffect, useMemo, useState } from "react";
import { AcceptsEmotion, Optional } from "yohak-tools";
import { isArray } from "yohak-tools/";
import { CheckStatus, TreeBranchView } from "./TreeBranchView";
import { findAscendants, findDescendants, retrieveTaxonInfo } from "../functions/proessTaxonInfo";
import { useSelectedTaxonMutators, useSelectedTaxonState } from "../states/selectedTaxon";
import { TaxonInfo, useTaxonListMutators, useTaxonListState } from "../states/taxonList";

type Props = { id: string } & AcceptsEmotion;

export const TaxonomicTreeBranch: FC<Props> = ({ id, css, className }) => {
  const taxonList = useTaxonListState();
  const myInfo: Optional<TaxonInfo> = useMemo(() => {
    return taxonList.find((item) => item.id === id);
  }, [taxonList, id]);
  const { branchChildren, isLoading } = useBranchChildren(myInfo);
  const { label, rank } = useTaxonInfo(id, myInfo);
  const { descendants, ascendants } = useLineages(id, taxonList);
  const { check, onClickCheck } = useChecked(id, taxonList, ascendants, descendants);
  const { ascendantsLabel } = useAscendantsLabel(ascendants);
  const [linkString, linkURL] = useLinkString(id, rank);
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
      hasChildren={!!branchChildren.length}
      isOpen={isOpen}
      isLoading={isLoading}
      onClickCheck={() => onClickCheck()}
      onToggleChildren={onToggleChildren}
    >
      {isOpen &&
        branchChildren.length &&
        branchChildren.map((childId) => <TaxonomicTreeBranch key={childId} id={childId} />)}
    </TreeBranchView>
  );
};

const useLinkString = (id: string, rank: string) => {
  const [linkString, setLinkString] = useState<string>("");
  const [linkURL, setLinkURL] = useState<string>("");
  useEffect(() => {
    setLinkString(`tax_id:${id}`);
    setLinkURL(`/taxon/${id}`);
  }, [id, rank]);
  return [linkString, linkURL];
};

const useBranchChildren = (info: Optional<TaxonInfo>) => {
  const [branchChildren, setBranchChildren] = useState<string[]>([]);
  const { setTaxonAsLoading, addTaxonToList, setTaxonChildren } = useTaxonListMutators();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(info?.children === "loading");
    if (info?.children === "not-yet") {
      setTaxonAsLoading(info.id);
      setIsLoading(true);
      retrieveTaxonInfo(info, addTaxonToList, setTaxonChildren);
    }
    if (info && isArray(info.children)) {
      setBranchChildren(info.children);
    }
  }, [info]);
  return { branchChildren, isLoading };
};

const useTaxonInfo = (id: string, myInfo: Optional<TaxonInfo>) => {
  const [rank, setRank] = useState("");
  const [label, setLabel] = useState("");
  useEffect(() => {
    if (myInfo) {
      setRank(myInfo.rank);
      setLabel(myInfo.label);
    }
  }, [id, myInfo]);
  return { rank, label };
};

const useChecked = (
  id: string,
  taxonList: TaxonInfo[],
  ascendants: string[],
  descendants: string[]
) => {
  const selectedTaxon = useSelectedTaxonState();
  const [check, setCheck] = useState<CheckStatus>("none");
  const { updateSelection } = useSelectedTaxonMutators();
  const onClickCheck = () => {
    updateSelection(taxonList, id);
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

  useEffect(() => {
    setAscendants(findAscendants(taxonList, id));
    setDescendants(findDescendants(taxonList, id));
  }, [taxonList, id]);

  return { ascendants, descendants };
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

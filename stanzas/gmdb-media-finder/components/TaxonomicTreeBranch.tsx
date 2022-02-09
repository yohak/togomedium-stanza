import { css } from "@emotion/react";
import React, { FC, useEffect, useState } from "react";
import { AcceptsEmotion, Optional } from "yohak-tools";
import { TreeBranchView } from "./TreeBranchView";
import { retrieveTaxonInfo } from "../functions/proessTaxonInfo";
import { TaxonInfo, useTaxonListMutators, useTaxonListState } from "../states/taxonList";

type Props = { id: string } & AcceptsEmotion;

export const TaxonomicTreeBranch: FC<Props> = ({ id, css, className }) => {
  const [linkString, linkURL] = useLinkString(id);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onToggleChildren = () => {
    setIsOpen((prev) => !prev);
  };
  const { taxChildren, label, rank } = useTaxChildren(id);
  return (
    <TreeBranchView
      css={css}
      className={className}
      label={label}
      id={id}
      tag={rank}
      linkString={linkString}
      linkURL={linkURL}
      check={"none"}
      hasChildren={!!taxChildren.length}
      isOpen={isOpen}
      onClickCheck={() => {}}
      onToggleChildren={onToggleChildren}
    >
      {isOpen &&
        taxChildren.length &&
        taxChildren.map((id) => <TaxonomicTreeBranch key={id} id={id} />)}
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

const useTaxChildren = (id: string) => {
  const taxonList = useTaxonListState();
  const { addTaxonToList } = useTaxonListMutators();
  const [taxChildren, setTaxChildren] = useState<string[]>([]);
  const [rank, setRank] = useState("");
  const [label, setLabel] = useState("");
  useEffect(() => {
    const myInfo: Optional<TaxonInfo> = taxonList.find((taxon) => taxon.id === id);
    if (myInfo) {
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
const taxonomicTreeBranch = css``;

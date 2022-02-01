import { css } from "@emotion/react";
import React, { FC, useEffect, useState } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { TreeBranchView } from "./TreeBranchView";
import { API_TAXONOMY_CHILDREN } from "../../../api/paths";
import {
  TaxonomyChildrenParams,
  TaxonomyChildrenResponse,
} from "../../../api/taxonomy_children/types";
import { getData } from "../../../utils/getData";

type Props = { id: string; label: string } & AcceptsEmotion;

export const TaxonomicTreeBranch: FC<Props> = ({ id, label, css, className }) => {
  const [linkString, linkURL] = useLinkString(id);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onToggleChildren = () => {
    setIsOpen((prev) => !prev);
  };
  const { childrenProps, hasChildren } = useTaxChildren(id);
  return (
    <TreeBranchView
      label={label}
      id={id}
      linkString={linkString}
      linkURL={linkURL}
      check={"none"}
      hasChildren={hasChildren}
      isOpen={isOpen}
      onClickCheck={() => {}}
      onToggleChildren={onToggleChildren}
    >
      {childrenProps?.length &&
        childrenProps.map((prop) => <TaxonomicTreeBranch key={prop.id} {...prop} />)}
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
  const [childrenProps, setChildrenProps] = useState<Props[]>([]);
  const [hasChildren, setHasChildren] = useState(false);
  useEffect(() => {
    (async () => {
      const params: TaxonomyChildrenParams = {
        tax_id: id,
      };
      const response = await getData<TaxonomyChildrenResponse, TaxonomyChildrenParams>(
        API_TAXONOMY_CHILDREN,
        params
      );
      if (response.body?.length) {
        const data: Props[] = response.body.map<Props>((item) => ({
          id: item.tax_id,
          label: item.name,
        }));
        setHasChildren(true);
        setChildrenProps(data);
      }
    })();
  }, [id]);
  return { childrenProps, hasChildren };
};

const taxonomicTreeBranch = css``;

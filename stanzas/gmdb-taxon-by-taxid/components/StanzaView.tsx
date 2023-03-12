import { css } from "@emotion/react";
import React, { ComponentProps, FC } from "react";
import { AcceptsEmotion, Optional } from "yohak-tools";
import { CapsuleList } from "../../../shared/components/info-detail/capsuleList";
import { LineageList } from "../../../shared/components/info-detail/LineageList";
import {
  ColorButton,
  ColWrapper,
  InfoId,
  InfoTitle,
  StandardParagraph,
  SubHeading,
} from "../../../shared/components/info-detail/styles";
import { stanzaWrapper } from "../../../shared/styles/common";

const linkNCBI = "https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?mode=Info&id=";
const linkTogoGenome = "http://togogenome.org/organism/";

type Props = {
  taxid: string;
  scientificName: string;
  authorityName: Optional<string>;
  lineage: ComponentProps<typeof LineageList>["lineage"];
  typeMaterials: string[];
  otherTypeMaterials: { key: string; labels: string[] }[];
} & AcceptsEmotion;

export type WikipediaData = {
  thumb?: string;
  description?: string;
  link: string;
};
export const StanzaView: FC<Props> = ({
  css,
  className,
  taxid,
  scientificName,
  authorityName,
  lineage,
  typeMaterials,
  otherTypeMaterials,
}) => {
  return (
    <div css={[stanzaView, css, stanzaWrapper]} className={className}>
      <ColWrapper>
        <div>
          <InfoId>
            <span>Taxonomy ID: </span>
            <span>{taxid}</span>
            <div className={"tag-list"}>
              <ColorButton target="_blank" href={`${linkNCBI}${taxid}`} rel="noreferrer">
                NCBI
              </ColorButton>
              <ColorButton target="_blank" href={`${linkTogoGenome}${taxid}`} rel="noreferrer">
                TogoGenome
              </ColorButton>
            </div>
          </InfoId>
          <InfoTitle>{scientificName}</InfoTitle>
          {authorityName && (
            <StandardParagraph>
              Authority name:
              <br />
              {authorityName}
            </StandardParagraph>
          )}
          <div>
            <SubHeading>Lineage</SubHeading>
            <LineageList lineage={lineage} />
          </div>
          {!!typeMaterials.length && (
            <div>
              <SubHeading>Type strains</SubHeading>
              <CapsuleList labels={typeMaterials} />
            </div>
          )}
          {!!otherTypeMaterials.length && (
            <div>
              {otherTypeMaterials.map((mat, index) => (
                <div key={index}>
                  <SubHeading>Heterotypic synonyms: {mat.key} </SubHeading>
                  <CapsuleList labels={mat.labels} />
                </div>
              ))}
            </div>
          )}
        </div>
      </ColWrapper>
    </div>
  );
};

const stanzaView = css``;

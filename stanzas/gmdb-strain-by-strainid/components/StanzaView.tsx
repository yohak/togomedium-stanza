import { css } from "@emotion/react";
import React, { ComponentProps, FC } from "react";
import { AcceptsEmotion, Nullable } from "yohak-tools";
import { LineageList } from "../../../shared/components/info-detail/LineageList";
import {
  ColorButton,
  ColWrapper,
  InfoId,
  InfoTitle,
  SubHeading,
  TagList,
} from "../../../shared/components/info-detail/styles";
import { stanzaWrapper } from "../../../shared/styles/common";

type Props = {
  strainId: string;
  strainName: string;
  infoSources: {
    label: string;
    url: string;
  }[];
  taxonomy: Nullable<{
    name: string;
    taxId: string;
    rank: string;
    authorityName: string;
    lineage: ComponentProps<typeof LineageList>["lineage"];
  }>;
} & AcceptsEmotion;

export const StanzaView: FC<Props> = ({
  css,
  className,
  strainId,
  strainName,
  infoSources,
  taxonomy,
}) => {
  return (
    <div css={[stanzaView, css, stanzaWrapper]} className={className}>
      <ColWrapper>
        <div>
          <InfoId>
            <span>Strain Id: </span>
            <span>{strainId}</span>
          </InfoId>
          <InfoTitle>{strainName}</InfoTitle>
          <SubHeading>{infoSources.length === 1 ? "Source strain" : "Source strains"}</SubHeading>
          <TagList>
            {infoSources.map((source, index) => (
              <ColorButton key={index} href={source.url} target={"_blank"} rel="noreferrer">
                {source.label}
              </ColorButton>
            ))}
          </TagList>
          {taxonomy && (
            <div>
              <SubHeading>Taxonomic Lineage</SubHeading>
              <LineageList lineage={taxonomy.lineage} />
            </div>
          )}
        </div>
      </ColWrapper>
    </div>
  );
};
const stanzaView = css``;

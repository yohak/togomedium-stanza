import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { FC } from "react";
import { AcceptsEmotion } from "yohak-tools";
import {
  ColorButton,
  ColWrapper,
  InfoId,
  InfoTitle,
  StandardParagraph,
  SubHeading,
  TagList,
} from "../../../shared/components/info-detail/styles";
import { stanzaWrapper } from "../../../shared/styles/common";
import { COLOR_GRAY300, COLOR_PRIMARY, COLOR_WHITE } from "../../../shared/styles/variables";
import { decodeHTMLEntities } from "../../../shared/utils/string";
import { ComponentClass, LinkInfo } from "../utils/api";

type Props = {
  prefLabel: string;
  gmoId: string;
  altLabels: string[];
  properties: ComponentClass[];
  roles: ComponentClass[];
  superClasses: ComponentClass[];
  subClasses: ComponentClass[];
  links: LinkInfo[];
  wikipediaData?: WikipediaData;
} & AcceptsEmotion;

export type WikipediaData = {
  thumb?: string;
  description?: string;
  link: string;
};
export const StanzaView: FC<Props> = ({
  css,
  className,
  prefLabel,
  gmoId,
  altLabels,
  properties,
  roles,
  superClasses,
  subClasses,
  links,
  wikipediaData,
}) => {
  return (
    <div css={[stanzaView, css, stanzaWrapper]} className={className}>
      <ColWrapper>
        <div>
          <InfoId>
            <span>GMO ID: </span>
            <span>{gmoId}</span>
          </InfoId>
          <InfoTitle>{decodeHTMLEntities(prefLabel)}</InfoTitle>
          {!!altLabels.length && (
            <StandardParagraph>
              Alternative labels:
              <br />
              {altLabels.map((str, i, arr) => (
                <span key={str}>{`${decodeHTMLEntities(str)}${addLastComma(i, arr)}`}</span>
              ))}
            </StandardParagraph>
          )}
          <div>
            {!!properties.length && (
              <>
                <SubHeading>Component types</SubHeading>
                <StandardParagraph>
                  {properties.map((item, i, arr) => (
                    <span key={i}>{`${item.label_en}${addLastComma(i, arr)}`}</span>
                  ))}
                </StandardParagraph>
              </>
            )}
            {!!roles.length && (
              <>
                <SubHeading>Roles</SubHeading>
                <ul>
                  {roles.map((item, i) => (
                    <li key={i}>{item.label_en}</li>
                  ))}
                </ul>
              </>
            )}
            {!!superClasses.length && (
              <>
                <SubHeading>Super classes</SubHeading>
                <LinkList>
                  {superClasses.map((item, i) => (
                    <li key={i}>
                      <a href={`/component/${item.gmo_id}`}>{item.gmo_id}</a>
                      <span>{decodeHTMLEntities(item.label_en)}</span>
                    </li>
                  ))}
                </LinkList>
              </>
            )}
            {!!subClasses.length && (
              <>
                <SubHeading>Sub classes</SubHeading>
                <LinkList>
                  {subClasses.map((item, i) => (
                    <li key={i}>
                      <a href={`/component/${item.gmo_id}`}>{item.gmo_id}</a>
                      <span>{decodeHTMLEntities(item.label_en)}</span>
                    </li>
                  ))}
                </LinkList>
              </>
            )}
            {!!links.length && (
              <>
                <SubHeading>Cross references</SubHeading>
                <TagList>
                  {links.map((item, i) => (
                    <ColorButton key={i} href={item.uri} target="_blank" rel="noreferrer">
                      {item.label}
                    </ColorButton>
                  ))}
                </TagList>
              </>
            )}
          </div>
        </div>
        {wikipediaData && (
          <WikipediaInfo>
            <p>
              {wikipediaData.thumb && <img src={wikipediaData.thumb} />}
              {wikipediaData.description}
            </p>
            <cite>
              <a href={wikipediaData.link} target={"_blank"} rel="noreferrer">
                From Wikipedia
              </a>
            </cite>
          </WikipediaInfo>
        )}
      </ColWrapper>
    </div>
  );
};

const addLastComma = (index: number, arr: any[]): "" | ", " => {
  return index === arr.length - 1 ? "" : ", ";
};

const LinkList = styled.ul`
  li {
    display: flex;
    gap: 8px;
  }

  a {
    color: ${COLOR_PRIMARY};
  }
`;

const WikipediaInfo = styled.div`
  margin-top: 32px;
  width: 336px;
  border: 1px ${COLOR_GRAY300} dashed;
  padding: 8px;
  border-radius: 5px;
  height: fit-content;
  cite {
    display: block;
    text-align: right;
    margin-top: 8px;
    a {
      color: ${COLOR_PRIMARY};
    }
  }
`;

const stanzaView = css``;

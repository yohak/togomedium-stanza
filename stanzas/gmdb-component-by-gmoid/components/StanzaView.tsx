import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { FC } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { stanzaWrapper } from "../../../shared/styles/common";
import { COLOR_GRAY300, COLOR_PRIMARY, COLOR_WHITE } from "../../../shared/styles/variables";
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
          <InfoTitle>{prefLabel}</InfoTitle>
          {!!altLabels.length && (
            <StandardParagraph>
              Alternative labels:
              <br />
              {altLabels.map((str, i, arr) => (
                <span key={str}>{`${str}${addLastComma(i, arr)}`}</span>
              ))}
            </StandardParagraph>
          )}
          <div>
            {!!properties.length && (
              <>
                <SubHeading>Properties</SubHeading>
                <StandardParagraph>
                  {properties.map((item, i, arr) => (
                    <span key={i}>{`${item.label_en}${addLastComma(i, arr)}`}</span>
                  ))}
                </StandardParagraph>
              </>
            )}
            {!!roles.length && (
              <>
                <SubHeading>Functions</SubHeading>
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
                      <span>{item.label_en}</span>
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
                      <span>{item.label_en}</span>
                    </li>
                  ))}
                </LinkList>
              </>
            )}
            {!!links.length && (
              <>
                <SubHeading>Links</SubHeading>
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

const ColWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoId = styled.p`
  span {
    font-weight: 300;
    font-size: 16px;
  }
`;
const InfoTitle = styled.h1`
  font-size: 40px;
  margin: 24px 0 16px;
  font-weight: 300;
  line-height: 0.9;
`;
const SubHeading = styled.h3`
  font-weight: 600;
  margin-top: 24px;
  margin-bottom: 8px;
  font-size: 20px;
`;
const StandardParagraph = styled.p`
  font-size: 16px;
  font-weight: 300;
  span {
    font-weight: 300;
    font-size: 16px;
  }
`;
const ColorButton = styled.a`
  background-color: ${COLOR_PRIMARY};
  color: ${COLOR_WHITE};
  padding: 4px 8px 2px;
  border-radius: 3px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
`;

const LinkList = styled.ul`
  li {
    display: flex;
    gap: 8px;
  }

  a {
    color: ${COLOR_PRIMARY};
  }
`;

const TagList = styled.div`
  display: flex;
  gap: 8px;
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

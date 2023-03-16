import styled from "@emotion/styled";
import React, { FC } from "react";
import { COLOR_GRAY300, COLOR_PRIMARY } from "../../styles/variables";

export type WikipediaData = {
  thumb?: string;
  description?: string;
  link: string;
};
export const fetchWikipediaData = async (link: string): Promise<WikipediaData> => {
  const key = link.split("/").pop();
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${key}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data) return { link };
  return { thumb: data.thumbnail?.source, description: data.extract, link };
};

export const WikipediaView: FC<WikipediaData> = ({ thumb, description, link }) => (
  <WikipediaInfo>
    <p>
      {thumb && <img src={thumb} alt={""} />}
      {description}
    </p>
    <cite>
      <a href={link} target={"_blank"} rel="noreferrer">
        From Wikipedia
      </a>
    </cite>
  </WikipediaInfo>
);

const WikipediaInfo = styled.div`
  margin-top: 32px;
  width: 336px;
  border: 1px ${COLOR_GRAY300} dashed;
  padding: 8px;
  border-radius: 5px;
  height: fit-content;
  line-height: 1.3;
  cite {
    display: block;
    text-align: right;
    margin-top: 8px;
    a {
      color: ${COLOR_PRIMARY};
    }
  }
`;

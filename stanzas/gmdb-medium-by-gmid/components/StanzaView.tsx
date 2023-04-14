import { css } from "@emotion/react";
import React, { ComponentProps, FC } from "react";
import { AcceptsEmotion } from "yohak-tools";
import { RecipeComment } from "./RecipeComment";
import { RecipeTable } from "./RecipeTable";
import { InfoId, InfoTitle, SubHeading } from "../../../shared/components/info-detail/styles";
import { stanzaWrapper } from "../../../shared/styles/common";
import { decodeHTMLEntities } from "../../../shared/utils/string";

type Props = {
  id: string | undefined;
  originalId: string | undefined;
  srcUrl: string | undefined;
  srcLabel: string | undefined;
  name: string | undefined;
  ph: string | undefined;
  components: (RecipeTableProps | RecipeCommentProps)[];
} & AcceptsEmotion;

export type RecipeTableProps = ComponentProps<typeof RecipeTable>;
export type RecipeCommentProps = ComponentProps<typeof RecipeComment>;

export const StanzaView: FC<Props> = ({
  css,
  className,
  id,
  originalId,
  srcUrl,
  srcLabel,
  name,
  ph,
  components,
}) => {
  return (
    <div css={[stanzaView, css, stanzaWrapper]} className={className}>
      <InfoId>
        <span>Growth Medium ID:&nbsp;</span>
        <span>{id}</span>
      </InfoId>
      {srcUrl && (
        <InfoId>
          <span>Information source:&nbsp;</span>
          <a href={srcUrl} target={"_blank"} rel="noreferrer">
            {originalId || srcLabel || id}
          </a>
        </InfoId>
      )}
      <InfoTitle>
        {name && decodeHTMLEntities(name)}
        {ph && <small>(pH{ph})</small>}
      </InfoTitle>
      {components.length && (
        <>
          <SubHeading>Components</SubHeading>
          {components.map((component, index) => {
            if ("comment" in component) {
              return <RecipeComment key={index} {...component} />;
            } else {
              return <RecipeTable key={index} {...component} />;
            }
          })}
        </>
      )}
    </div>
  );
};

const stanzaView = css``;

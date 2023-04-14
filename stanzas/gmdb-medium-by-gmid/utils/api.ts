import { ComponentProps } from "react";
import { getData } from "../../../shared/utils/getData";
import { URL_API } from "../../../shared/utils/variables";
import { RecipeCommentProps, RecipeTableProps, StanzaView } from "../components/StanzaView";

export const getMedia = async (gm_id: string) => {
  const apiName = "gmdb_medium_by_gmid";
  const result = await getData<ApiBody>(`${URL_API}${apiName}`, { gm_id });
  if (result.body) {
    return processData(result.body);
  } else {
    return undefined;
  }
};

export type ViewProps = ComponentProps<typeof StanzaView>;
const processData = (body: ApiBody): ViewProps => {
  const id = body.meta.gm.split("/").pop()!;
  return {
    id,
    originalId: body.meta.original_media_id,
    name: body.meta.name,
    srcLabel: getSrcLabel(body.meta.src_url),
    srcUrl: body.meta.src_url,
    ph: body.meta.ph,
    components: processComponents(id, body.components, body.comments),
  };
};

const processComponents = (
  myId: string,
  tables: ApiComponentTable[],
  comments: ApiComponentComment[]
): ViewProps["components"] => {
  return [...processComponentTables(tables, myId), ...processComponentComments(comments)].sort(
    (a, b) => a.index - b.index
  );
};

const processComponentTables = (tables: ApiComponentTable[], gmID: string): RecipeTableProps[] => {
  return tables.map((table) => ({
    index: table.paragraph_index,
    name: table.subcomponent_name,
    items: table.items.map((item) => ({
      id: item.gmo_id || "",
      componentName: item.component_name,
      componentLabel: item.label || "",
      concValue: item.conc_value?.toString() || "",
      concUnit: item.conc_unit || "",
      volume: item.volume?.toString() || "",
      unit: item.unit || "",
      referenceMediaId:
        !item.reference_media_id || item.reference_media_id === gmID ? "" : item.reference_media_id,
    })),
  }));
};
const processComponentComments = (comments: ApiComponentComment[]): RecipeCommentProps[] => {
  return comments.map((item) => ({
    index: item.paragraph_index,
    comment: item.comment ? item.comment : "&nbsp;",
  }));
};

type ApiBody = {
  meta: Meta;
  components: ApiComponentTable[];
  comments: ApiComponentComment[];
};
type Meta = {
  gm: string;
  name: string;
  src_url: string;
  ph: string;
  original_media_id?: string;
};
export type ApiComponentTable = {
  subcomponent_name: string;
  items: Component[];
} & ApiRecipeItem;

export type ApiComponentComment = {
  comment: string;
} & ApiRecipeItem;

type ApiRecipeItem = {
  paragraph_index: number;
};

type Component = {
  component_name: string;
  volume?: number;
  unit?: string;
  gmo?: string;
  gmo_id?: string;
  label?: string;
  conc_value?: number;
  conc_unit?: string;
  reference_media_id?: string;
};

const getSrcLabel = (str: string): string => {
  switch (true) {
    case str.match(/jcm.*riken/) !== null:
      return "JCM";
    case str.match(/nite.*nbrc/) !== null:
      return "NBRC";
    case str.match(/dsmz\.de/) !== null:
      return "DSMZ";
    case str.match(/atcc\.org/) !== null:
      return "ATCC";
    default:
      return "SRC";
  }
};

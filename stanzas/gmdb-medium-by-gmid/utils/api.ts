import { copy } from "copy-anything";
import { ComponentProps } from "react";
import { getData } from "../../../shared/utils/getData";
import { URL_API } from "../../../shared/utils/variables";
import {
  RecipeCommentProps,
  RecipeTableProps,
  ReferencingRecipe,
  StanzaView,
} from "../components/StanzaView";

export type ViewProps = ComponentProps<typeof StanzaView>;
export const getMedia = async (gm_id: string) => {
  const apiName = "gmdb_medium_by_gmid";
  const result = await getData<ApiBody>(`${URL_API}${apiName}`, { gm_id });
  if (result.body) {
    const extra = await getExternalReferences(result.body, gm_id);

    return processData(result.body, extra);
  } else {
    return undefined;
  }
};

export const getExternalReferences = async (
  body: ApiBody,
  gm_id: string
): Promise<ReferencingRecipe[]> => {
  const externalReferences = copy(body)
    .components.map((component) =>
      component.items.filter(
        (item) => !!item.reference_media_id && item.reference_media_id !== gm_id
      )
    )
    .filter((item) => item.length > 0)
    .flat()
    .map((item) => ({
      id: item.reference_media_id!,
      name: item.component_name.replace(/ \(.*\)/, "").replace(/\*/g, ""),
    }));

  const extraData: ReferencingRecipe[] = [];

  for await (const ref of externalReferences) {
    const apiName = "gmdb_medium_by_gmid";
    const result = await getData<ApiBody>(`${URL_API}${apiName}`, { gm_id: ref.id });
    if (result.body) {
      const data = processData(result.body);
      const components = data.components;
      const target = components.find((item: any) => item.name === ref.name);
      const arr: any[] = [target];
      if (target) {
        const targetIndex = components.indexOf(target);
        let i = 1;
        while ((components[targetIndex + i] as any)?.comment) {
          const comment = components[targetIndex + i] as any;
          arr.push(comment);
          i++;
          if (i > 100) break;
        }
      }
      extraData.push({ components: arr, id: ref.id });
    }
  }
  return extraData;
};

const processData = (body: ApiBody, extraComponents: ReferencingRecipe[] = []): ViewProps => {
  const id = body.meta.gm.split("/").pop()!;
  return {
    id,
    originalId: body.meta.original_media_id,
    name: body.meta.name,
    srcLabel: getSrcLabel(body.meta.src_url),
    srcUrl: body.meta.src_url,
    ph: body.meta.ph,
    components: processComponents(id, body.components, body.comments),
    extraComponents,
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

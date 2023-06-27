import { useEffect, useState } from "react";
import { haveSameElements } from "../../../shared/utils/arr";
import { clone } from "../../../shared/utils/clone";
import { getData } from "../../../shared/utils/getData";
import { sleep } from "../../../shared/utils/promise";
import { URL_API } from "../../../shared/utils/variables";
import { getMedia } from "../../gmdb-medium-by-gmid/utils/api";

type ProcessStatus = "processing" | "done" | "ready";
const MAX_ITERATION_COUNT = 999999;
const INTERVAL = 2000;

type NodeObj = {
  id: string;
  label: string;
  level: number;
  status: ProcessStatus;
};

type Link = {
  source: string;
  target: string;
  score: number;
};

export type GraphData = {
  links: Link[];
  nodes: NodeObj[];
};

export type GraphDataResponse = {
  contents: {
    gm_id: {
      label: string;
      href: string;
    };
    name: string;
    score: number;
  }[];
};

export const useGraphData = (
  initialId: string,
  maxLevel: number = Infinity,
  ignoreExactMatch: boolean = true
) => {
  const [maxIterationCount, setMaxIterationCount] = useState(MAX_ITERATION_COUNT);
  const [graphData, setGraphData] = useState<GraphData>({
    links: [],
    nodes: [],
  });
  const [isInit, setIsInit] = useState(false);
  const [iterationCount, setIterationCount] = useState(0);
  const [queue, setQueue] = useState<string[]>([initialId]);
  const [processed, setProcessed] = useState<string[]>([]);
  //
  const getGraphData = () => {
    let result: GraphData = { links: [], nodes: [] };
    setGraphData((prev) => {
      result = prev;
      return prev;
    });
    return result;
  };
  const getProcessed = () => {
    let result: string[] = [];
    setProcessed((prev) => {
      result = prev;
      return prev;
    });
    return result;
  };
  const getQueue = () => {
    let result: string[] = [];
    setQueue((prev) => {
      result = prev;
      return prev;
    });
    return result;
  };
  const processNext = () => {
    (async () => {
      if (iterationCount >= maxIterationCount) return;
      const clonedQueue = [...getQueue()];
      const nextId = clonedQueue.shift();
      if (!nextId) return;
      //
      const data = getGraphData();
      const currentLevel = getCurrentLevel(data, nextId);
      const res = await getSimilarData(nextId);
      const processedData = processData(res, nextId, currentLevel + 1);
      setProcessed([...getProcessed(), nextId]);
      const newQueue = makeNewQueue(clonedQueue, processedData, getProcessed());
      setQueue(currentLevel < maxLevel ? newQueue : clonedQueue);
      setGraphData(
        mergeData(data, processedData, maxLevel, {
          currentId: nextId,
          nextId: getQueue()[0],
        })
      );
      console.log(iterationCount, newQueue);
    })();
  };
  //

  useEffect(() => {
    (async () => {
      const initialData = await getInitialData(initialId);
      setGraphData(initialData);
      setIsInit(true);
    })();
  }, []);

  useEffect(() => {
    if (!isInit) return;
    (async () => {
      if (iterationCount >= maxIterationCount) return;
      await sleep(iterationCount === 0 ? 16 : INTERVAL);
      setIterationCount(iterationCount + 1);
      processNext();
    })();
  }, [queue, isInit]);

  return { graphData, maxIterationCount, setMaxIterationCount };
};

const makeNewQueue = (queue: string[], data: GraphData, processed: string[]) => {
  return [...queue, ...data.nodes.map((item) => item.id)]
    .filter((id) => !processed.includes(id))
    .reduce<string[]>((acc, item) => (acc.find((i) => i === item) ? acc : [...acc, item]), []);
};

const makeLoadingData = (data: GraphData, id: string): GraphData => {
  const nodes = data.nodes.map<NodeObj>((item) =>
    item.id === id ? { ...item, status: "processing" } : item
  );
  return { ...data, nodes };
};

const getCurrentLevel = (data: GraphData, id: string): number => {
  const node = data.nodes.find((item) => item.id === id);
  return node ? node.level : 0;
};

const mergeData = (
  data1: GraphData,
  data2: GraphData,
  maxLevel: number,
  { currentId, nextId }: { currentId: string; nextId: string }
): GraphData => {
  const nodes: NodeObj[] = [...data1.nodes, ...data2.nodes]
    .reduce<NodeObj[]>((acc, item) => {
      const hasSameItem = acc.find((i) => i.id === item.id);
      return hasSameItem ? acc : [...acc, item];
    }, [])
    .filter((item) => item.level <= maxLevel)
    .map((item) => {
      switch (true) {
        case item.id === currentId:
          return { ...item, status: "done" };
        case item.id === nextId:
          return { ...item, status: "processing" };
        default:
          return item;
      }
    });
  const links = [...data1.links, ...data2.links]
    .reduce<Link[]>((acc, item) => {
      const hasSameItem = acc.find((i) =>
        haveSameElements([i.source, i.target], [item.source, item.target])
      );
      return hasSameItem ? acc : [...acc, item];
    }, [])
    .filter(
      (item) =>
        nodes.find((node) => node.id === item.source) &&
        nodes.find((node) => node.id === item.target)
    );

  return { links, nodes };
};

const processData = (
  data: GraphDataResponse["contents"],
  source: string,
  level: number
): GraphData => {
  const links: Link[] = data.map((item) => ({
    source,
    target: item.gm_id.label,
    score: item.score,
  }));
  const nodes: NodeObj[] = data.map((item) => ({
    id: item.gm_id.label,
    label: item.name,
    level,
    status: "ready",
  }));
  return { links, nodes };
};

const getInitialData = async (gm_id: string): Promise<GraphData> => {
  const links: Link[] = [];
  const data = await getMedia(gm_id)!;
  const id = data?.id || "";
  const label = data?.name || "";
  const level = 0;
  const processed = "done";
  const nodes: NodeObj[] = [{ id, label, level, status: processed }];
  return clone({ links, nodes });
};

const getSimilarData = async (gm_id: string) => {
  const apiName = "gmdb_list_similar_media_by_gmid";
  const data = await getData<GraphDataResponse>(`${URL_API}${apiName}`, {
    gm_id,
    limit: 99,
    offset: 0,
  });
  return data.body!.contents;
};

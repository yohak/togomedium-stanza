import React, { useEffect, useState } from "react";
import { AlignmentTable } from "./components/AlignmentTable";
import { mediaAlignmentTableResponse1 } from "../../api/media-alignment-table/response1";
import { MediaAlignmentTableResponse } from "../../api/media-alignment-table/types";

export type AppProps = {
  gmids: string[];
};

const App = ({ gmids }: AppProps) => {
  const [data, setData] = useState<MediaAlignmentTableResponse>();
  // useEffect(() => {
  //   fetch("http://growthmedium.org/sparqlist/api/gmdb_media_alignment_by_gmids", {
  //     method: "POST",
  //   }).then((r) => r.json().then((r) => setData(r)));
  // }, [gmids]);
  useEffect(() => {
    setData(mediaAlignmentTableResponse1);
  }, []);
  return <>{data && <AlignmentTable data={data} />}</>;
};

export default App;

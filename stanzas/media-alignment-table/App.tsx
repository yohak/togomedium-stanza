import React, { useEffect } from "react";
import { useIsMediaExpendedState } from "./states/isMediaExpanded";

export type AppProps = {
  gmids: string[];
};

const App = ({ gmids }: AppProps) => {
  useEffect(() => {
    fetch("http://growthmedium.org/sparqlist/api/gmdb_media_alignment_by_gmids", {
      method: "POST",
    }).then((r) => r.json().then((r) => console.log(r)));
  }, [gmids]);
  return <div>{gmids.map((str) => str)}</div>;
};

export default App;

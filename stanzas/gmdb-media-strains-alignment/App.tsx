import React from "react";
import { AppContainer } from "./components/AppContainer";
import { data1 } from "../../api/media_strains_alignment/data1";

const App = () => {
  return <AppContainer data={data1}></AppContainer>;
};

export default App;

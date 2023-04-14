import { App } from "./App";
import { TogoMediumReactStanza } from "../../shared/StanzaReactProvider";

type StanzaParameters = {
  gm_id: string;
};

export default class ReactStanza extends TogoMediumReactStanza<StanzaParameters> {
  makeApp() {
    const gm_id = this.params.gm_id;
    return <App gm_id={gm_id} />;
  }
}

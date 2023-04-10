import { createContext } from "react";
import { State } from "./types";

const ConnectionContext = createContext<
  | {
      state: State;
      connect: () => void;
      initPage: () => void;
      switchToLineaChain: () => Promise<any>
      addLineaChain: () => Promise<any>;
    }
  | undefined
>(undefined);


export default ConnectionContext;
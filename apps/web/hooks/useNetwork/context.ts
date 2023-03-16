import { createContext } from "react";
import { State } from "./types";

const ConnectionContext = createContext<
  | {
      state: State;
      connect: () => void;
      initPage: () => void;
      switchChain: () => Promise<any>
      addChain: (infuraKey: string) => Promise<any>;
    }
  | undefined
>(undefined);


export default ConnectionContext;
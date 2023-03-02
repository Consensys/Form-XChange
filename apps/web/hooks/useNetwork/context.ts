import { createContext } from "react";
import { State } from "./types";

const ConnectionContext = createContext<
  | {
      state: State;
      connect: () => void;
      initPage: () => void;
    }
  | undefined
>(undefined);


export default ConnectionContext;
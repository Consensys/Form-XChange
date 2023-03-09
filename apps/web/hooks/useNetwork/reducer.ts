import { State, Action } from "./types";

export const initialState: State = {
  isConnected: false,
  isMetaMaskInstalled: false,
  wrongNetwork: undefined,
  wallet: undefined,
  balance: undefined,
  chainId: null,
  status: "LOADING",
};


const reducer = (state: State, { type, payload }: Action): State => {
  switch (type) {
    case "page_loaded":
      return {
        ...state,
        ...payload,
      };
    case "connect":
      const newState = {
        ...state,
        ...payload,
      };
      return newState;
    case "disconnect":
      return initialState;
    case "change_account":
      return {
        ...state,
        ...payload,
      };
    case "change_network":
      return {
        ...state,
        ...payload,
      };
    default: {
      throw new Error("Unhandled action type");
    }
  }
};

export default reducer;

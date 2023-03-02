import { State, Action } from "./types";

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
      return {
        ...state,
        ...payload,
      };
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

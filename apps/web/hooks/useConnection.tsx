import {
  createContext,
  DispatchWithoutAction,
  PropsWithChildren,
  useContext,
  useReducer,
  useState,
  Dispatch,
  useEffect,
} from "react";

import { metaMask, initMetaMask } from "../lib/metaMask";
import { isAccountList, networks } from "../utils/networks";

type State = {
  isConnected: boolean;
  address: string | undefined;
  chainId: string | null;
  wrongNetwork: boolean | undefined;
  balance: string | undefined;
  status: "LOADING" | "IDLE";
};

const initialState: State = {
  isConnected: false,
  wrongNetwork: undefined,
  address: undefined,
  balance: undefined,
  chainId: null,
  status: "LOADING",
};

type Action =
  | {
      type: "page_loaded";
      payload: {
        isMetaMaskInstalled: boolean;
        wallet: string;
        balance: string;
      };
    }
  | {
      type: "connect";
      payload: {
        address: string | undefined;
        balance: string | undefined;
        chainId?: string | null;
        wrongNetwork?: boolean;
      };
    }
  | {
      type: "disconnect";
      payload: {};
    }
  | {
      type: "change_network";
      payload: {
        chainId: string;
        wrongNetwork: boolean;
      };
    }
  | {
      type: "change_account";
      payload: {
        address: string;
        balance: string;
      };
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
        address: payload.address,
        balance: payload.balance,
        chainId: payload.chainId!,
        wrongNetwork: payload.wrongNetwork,
        isConnected: true,
      };
      window.localStorage.setItem("metamaskState", JSON.stringify(newState));
      return newState;
    case "disconnect":
      return {
        ...state,
        isConnected: false,
      };
    case "change_account":
      return {
        ...state,
        address: payload.address,
        balance: payload.balance,
      };
    case "change_network":
      return {
        ...state,
        chainId: payload.chainId,
        wrongNetwork: payload.wrongNetwork,
      };
    default: {
      throw new Error("Unhandled action type");
    }
  }
};

const ConnectionContext = createContext<
  | {
      state: State;
      connect: () => void;
    }
  | undefined
>(undefined);

const ConnectionProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const metaMaskSdk = metaMask();

  const {
    connectWallet,
    getWalletBalance,
    getChainId,
    ethereum,
    listenToAccounts,
    listenToChain,
  } = metaMaskSdk!;

  const connect = async () => {
    const address = await connectWallet();
    const balance = await getWalletBalance(address);
    const chainId = getChainId();

    let wrongNetwork = false;

    if (chainId !== networks.development.network_id) {
      wrongNetwork = true;
    }

    dispatch({
      type: "connect",
      payload: { address, balance, chainId, wrongNetwork },
    });

    listenToAccounts(async (newAccounts) => {
      if (isAccountList(newAccounts) && newAccounts.length > 0) {
        const newBalance = await getWalletBalance(newAccounts[0]);
        console.log({ newBalance });

        const narrowedBalance =
          typeof newBalance === "string" ? newBalance : "";
        console.log({ narrowedBalance });

        dispatch({
          type: "connect",
          payload: {
            address: newAccounts[0],
            balance: narrowedBalance,
          },
        });
      } else {
        dispatch({
          type: "disconnect",
          payload: {},
        });
      }
    });

    listenToChain(async (newChain) => {
      let wrongNetwork = false;

      if (newChain !== networks.development.network_id) {
        wrongNetwork = true;
      }
      dispatch({
        type: "change_network",
        payload: { chainId: newChain, wrongNetwork },
      });
      // window.location.reload();
    });
  };

  return (
    <ConnectionContext.Provider value={{ state, connect }}>
      {children}
    </ConnectionContext.Provider>
  );
};

const useConnection = () => {
  const context = useContext(ConnectionContext);

  if (context === undefined) {
    throw new Error(
      "useConnection hook must be used within a ConnectionProvider"
    );
  }
  return context;
};

export { ConnectionProvider, useConnection };

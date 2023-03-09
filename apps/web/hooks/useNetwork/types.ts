export type State = {
  isMetaMaskInstalled: boolean;
  wallet: string | undefined;
  balance: string | undefined;
  chainId: string | null;
  isConnected: boolean;
  wrongNetwork: boolean | undefined;
  status: "LOADING" | "IDLE";
};

export type Action =
  | {
      type: "page_loaded";
      payload: Pick<
        State,
        "isMetaMaskInstalled" | "wallet" | "balance" | "wrongNetwork" | "isConnected"
      >;
    }
  | {
      type: "connect";
      payload: Pick<
        State,
        "wallet" | "balance" | "isConnected" | "chainId" | "wrongNetwork"
      >;
    }
  | {
      type: "disconnect";
      payload: {};
    }
  | {
      type: "change_network";
      payload: Pick<State, "chainId" | "wallet" | "balance" | "wrongNetwork">;
    }
  | {
      type: "change_account";
      payload: Pick<State, "wallet" | "balance">;
    };

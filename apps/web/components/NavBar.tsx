import { useEffect } from "react";
import { useConnection } from "../hooks/useNetwork";

export default function ConnectModal() {
  const { state, connect, initPage } = useConnection();

  useEffect(() => {
    initPage();
    // remove listners on unmount;
  }, []);

  return (
    <div>
      {<button onClick={() => connect()}>Connect</button>}
      <p>Address: {state.wallet}</p>
      <p>Balance: {state.balance}</p>
      <p>Chain: {state.chainId}</p>
      <p>{state.wrongNetwork && "wrong network"}</p>
    </div>
  );
}

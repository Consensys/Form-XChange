import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useConnection } from "../hooks/useConnection";

export default function ConnectModal() {
  const { state, connect } = useConnection();

  return (
    <div>
      {<button onClick={() => connect()}>Connect</button>}
      <p>Address: {state.address}</p>
      <p>Balance: {state.balance}</p>
      <p>Chain: {state.chainId}</p>
      <p>{state.wrongNetwork && "wrong network"}</p>
      {/* <h3>There are the chains</h3>
      {chains.map((chain) => (
        <button key={chain.id}>
          {chain.name}: {chain.network}
        </button>
      ))}

      <h3>Connected chain</h3>
      <p>{chain?.name}</p>

      <h3>Connectors</h3>
      {
        connectors.map(connector => <button key={connector.id} onClick={() => connect({ connector })} >{connector.name}</button>)
      }

      <h3>Provider</h3>
      <p>{providers.network.name}</p> */}
    </div>
  );
}

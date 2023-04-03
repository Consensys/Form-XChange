import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useNetwork } from "../hooks/useNetwork";
import { truncateEthAddress } from "../utils/networks";
import Button from "./Button";
import ConnectionModal from "./ConnectionModal";
import { H1, Text } from "./Text";
import { twMerge } from "tailwind-merge";

const Nav = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { state, initPage, switchChain } = useNetwork();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    initPage();
    // @TODO remove listners on unmount;
  }, []);

  return (
    <nav className="flex justify-between py-4">
      <H1>Home</H1>
      <div className="flex items-center">
        {state.wallet && (
          <div className="flex mr-2">
            <Text className="mr-2 whitespace-nowrap">
              {truncateEthAddress(state.wallet)}
            </Text>
            <Text className="font-bold whitespace-nowrap">
              {`(${parseFloat(
                ethers.utils.formatEther(state.balance || "")
              ).toFixed(2)} ETH)`}
            </Text>
          </div>
        )}

        <Button
          className={twMerge(
            "py-2 max-w-[200px]",
            state.wrongNetwork && state.isConnected && "bg-red-500"
          )}
          onClick={openModal}
        >
          {!state.isConnected
            ? "Start voting!"
            : state.wrongNetwork
            ? "Switch to zkEVM"
            : "Connected"}
        </Button>
      </div>
      <ConnectionModal isOpen={isModalOpen} handleCloseModal={closeModal} />
    </nav>
  );
};

export default Nav;

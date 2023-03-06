import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useNetwork } from "../hooks/useNetwork";
import { truncateEthAddress } from "../utils/networks";
import Button from "./Button";
import ConnectionModal from "./ConnectionModal";
import { H1, Text } from "./Text";

const Nav = () => {
  let [isModalOpen, setIsModalOpen] = useState(false);
  const { state, initPage, switchChain } = useNetwork();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    initPage();
    // @TODO remove listners on unmount;
  }, []);

  return (
    <nav className="flex justify-between my-4">
      <H1>Home</H1>
      <div className="flex items-center">
        {state.wrongNetwork && (
          <Button
            variant="light"
            className="py-2 mr-2 border-0"
            onClick={switchChain}
          >
            <Text className="mr-2 font-semibold text-red-600 whitespace-nowrap">
              Change network
            </Text>
          </Button>
        )}
        {state.wallet && (
          <Button variant="light" className="py-2 mr-2 border-0">
            <div className="flex">
              <Text className="mr-2 whitespace-nowrap">
                {truncateEthAddress(state.wallet)}
              </Text>
              <Text className="font-bold whitespace-nowrap">
                {`(${parseFloat(
                  ethers.utils.formatEther(state.balance || "")
                ).toFixed(2)} ETH)`}
              </Text>
            </div>
          </Button>
        )}

        <Button className="py-2 max-w-[200px]" onClick={openModal}>
          Start voting!
        </Button>
      </div>
      <ConnectionModal isOpen={isModalOpen} handleCloseModal={closeModal} />
    </nav>
  );
};

export default Nav;

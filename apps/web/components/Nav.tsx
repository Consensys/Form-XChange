import { useState, useEffect } from "react";
import { useNetwork } from "../hooks/useNetwork";
import { truncateEthAddress } from "../utils/networks";
import Button from "./Button";
import { H1, Text } from "./Text";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { getFormattedBalance } from "../utils/networks";
import FundModal from "./FundModal";
import { useRouter } from "next/router";
import { ConnectionButton } from "./ConnectionButton";

const Nav = () => {
  const [isFundModalOpen, setIsFundModalOpen] = useState(false);
  const {
    state: { isConnected, wrongNetwork, wallet, balance },
    initPage,
  } = useNetwork();

  const router = useRouter();

  const formattedBalance = getFormattedBalance(balance || "0x0");

  const openFundModal = () => setIsFundModalOpen(true);
  const closeFundModal = () => setIsFundModalOpen(false);

  useEffect(() => {
    initPage();
    // @TODO remove listners on unmount;
  }, []);

  return (
    <nav className="flex justify-between py-4">
      <Link href="/" className="w-full">
        <H1>Form xChange</H1>
      </Link>

      <div className="flex items-center justify-end w-full gap-4">
        {wallet && (
          <div className="flex items-center mr-2">
            <Text className="mr-2 whitespace-nowrap">
              {truncateEthAddress(wallet)}
            </Text>

            <Text className="font-bold whitespace-nowrap">
              {`(${formattedBalance} ETH)`}
            </Text>
          </div>
        )}

        {isConnected && (
          <Button
            variant="borderless"
            className={twMerge(
              "max-w-[200px] py-2",
              formattedBalance === 0 && "border-red-500"
            )}
            onClick={() => {
              formattedBalance === 0
                ? openFundModal()
                : router.push("/create-form");
            }}
          >
          {formattedBalance === 0 ? 'Fund your wallet' : 'New feedback form'}
          </Button>
        )}
        <ConnectionButton />
      </div>
      <FundModal isOpen={isFundModalOpen} handleCloseModal={closeFundModal} />
    </nav>
  );
};

export default Nav;

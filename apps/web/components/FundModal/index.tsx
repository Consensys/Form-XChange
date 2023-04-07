import { FC, Fragment } from "react";
import Link from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import { H3, Text } from "../Text";

type Props = {
  isOpen: boolean;
  handleCloseModal: () => void;
};

const FundModal: FC<Props> = ({ isOpen, handleCloseModal }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {
          handleCloseModal();
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex flex-col items-center w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <button
                  onClick={handleCloseModal}
                  className="absolute text-3xl right-3 top-1 hover:opacity-40"
                >
                  &times;
                </button>
                <H3>Fund your wallet!</H3>
                <div className="flex flex-col flex-start">
                  <Text className="mt-4">
                    Balance of your wallet is 0 ETH!
                    <br /> Please fund your wallet to move forward. You can use
                    a
                    <Link
                      className="mx-1 text-blue-500"
                      target="_blank"
                      href="https://faucetlink.to/goerli"
                    >
                      faucet
                    </Link>
                    to obtain Goerli ETH. Then,
                    <Link
                      className="text-blue-500 "
                      target="_blank"
                      href="https://goerli.hop.exchange/#/send?token=ETH"
                    >
                      bridge
                    </Link>{" "}
                    funds from Goerli to Linea
                  </Text>

                  <Text className="mt-6">
                    Need more help ?
                    <Link
                      className="ml-2 text-blue-500"
                      target="_blank"
                      href="https://docs.linea.build/use-linea/bridge-funds"
                    >
                      click here
                    </Link>
                  </Text>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FundModal;

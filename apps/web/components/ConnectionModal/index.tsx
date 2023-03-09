import { FC, Fragment, ReactNode, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import WalletStep from "./steps/Wallet";
import InfuraStep from "./steps/Infura";
import SwitchNetworkStep from "./steps/SwitchNetwork";
import SnapStep from "./steps/Snap";

type Props = {
  isOpen: boolean;
  handleCloseModal: () => void;
};

const ConnectionModal: FC<Props> = ({ isOpen, handleCloseModal }) => {
  const [currentStep, setCurrentStep] =
    useState<(typeof steps)[number]>("wallet");

  const steps = ["wallet", "infura", "switch_network", "snap"] as const;

  const stepperMap: { [K in (typeof steps)[number]]: ReactNode } = {
    wallet: <WalletStep next={() => setCurrentStep("infura")} />,
    infura: <InfuraStep next={() => setCurrentStep("switch_network")} />,
    switch_network: <SwitchNetworkStep next={() => setCurrentStep("snap")} />,
    snap: <SnapStep next={() => {}} />,
  };

  const getCurrentStep = (key: (typeof steps)[number]) => stepperMap[key];

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {
          handleCloseModal();
          setCurrentStep("wallet");
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
                {getCurrentStep(currentStep)}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ConnectionModal;

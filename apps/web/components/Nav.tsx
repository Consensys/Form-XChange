import { useEffect, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Bars4Icon } from "@heroicons/react/24/solid";
import { useNetwork } from "../hooks/useNetwork";
import { truncateEthAddress } from "../utils/networks";
import { H1, Text } from "./Text";
import Link from "next/link";
import { getFormattedBalance } from "../utils/networks";
import { useRouter } from "next/router";
import { ConnectionButton } from "./ConnectionButton";
import { NewFormButton } from "./NewFormButton";
import { Fund } from "./Fund";

const Nav = () => {
  const {
    state: { isConnected, wallet, balance },
    initPage,
  } = useNetwork();

  const router = useRouter();

  const formattedBalance = getFormattedBalance(balance || "0x0");

  useEffect(() => {
    initPage();
  }, []);

  return (
    <nav className="flex justify-between py-4 max-w-screen-2xl mx-auto">
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

        <div className="hidden lg:flex">
          {isConnected &&
            (formattedBalance === 0 ? (
              <Fund currentBalance={formattedBalance} className="mr-2" />
            ) : (
              <NewFormButton
                onClick={() => router.push("/create-form")}
                className="mr-2"
              />
            ))}
          <ConnectionButton />
        </div>
        <div className="text-right lg:hidden">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                <Bars4Icon
                  className="w-5 h-12 ml-2 -mr-1 text-black hover:text-opacity-60"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-4 py-4 rounded-lg">
                  {isConnected && (
                    <Menu.Item>
                      {formattedBalance === 0 ? (
                        <Fund
                          currentBalance={formattedBalance}
                          className="mb-2"
                        />
                      ) : (
                        <NewFormButton
                          onClick={() => router.push("/create-form")}
                          className="mb-2"
                        />
                      )}
                    </Menu.Item>
                  )}

                  <Menu.Item>
                    <ConnectionButton />
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

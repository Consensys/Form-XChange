import { useNetwork } from "apps/web/hooks/useNetwork";
import { ChangeEventHandler, FC, Fragment, useState } from "react";
import Button from "../../Button";
import { Input } from "../../Input";
import { H3, Text } from "../../Text";

type Props = {
  next?: () => void;
};

const InfuraStep: FC<Props> = () => {
  const [infuraKey, setInfuraKey] = useState<string | null>(null);
  const [infuraKeyError, setInfuraKeyError] = useState<string | null>(null);
  const { addChain } = useNetwork();

  const handleInfuraKeyChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setInfuraKeyError(null);
    setInfuraKey(event.target.value);
  };

  const addZKEVMNetwork = async () => {
    if (!infuraKey) {
      return;
    }
    try {
      await addChain(infuraKey);
    } catch (error) {
      setInfuraKeyError(
        "We could not use this infura api key. Please try a different key"
      );
    }
  };

  return (
    <Fragment>
      <H3>Add zkEVM</H3>
      <Text className="mt-4">
        Please put your infura api key to add the zkEVM network to MetaMask!
      </Text>
      <Input
        label=""
        className="w-full mt-4"
        inputClassName="w-full"
        onChange={handleInfuraKeyChange}
      />
      {infuraKeyError && <Text className="text-red-500">{infuraKeyError}</Text>}
      <Button className="mt-5" onClick={addZKEVMNetwork}>
        <Text className="mr-2 text-white font-semiboldwhitespace-nowrap">
          Add Infura key
        </Text>
      </Button>
    </Fragment>
  );
};

export default InfuraStep;

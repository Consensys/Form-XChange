import { FC, Fragment } from "react";
import { H3, Title, Text } from "../../Text";

type Props = {
  next: () => void;
};

const SwitchNetworkStep: FC<Props> = ({ next }) => {
  return (
    <Fragment>
      <H3>SwitchNetwork</H3>

    </Fragment>
  );
};

export default SwitchNetworkStep;

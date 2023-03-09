import { FC, Fragment } from "react";
import { H3, Title, Text } from "../../Text";

type Props = {
  next: () => void;
};

const InfuraStep: FC<Props> = ({ next }) => {
  return (
    <Fragment>
      <H3>Infura</H3>

    </Fragment>
  );
};

export default InfuraStep;

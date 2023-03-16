import { FC, Fragment } from "react";
import { H3, Title, Text } from "../../Text";

type Props = {
  next?: () => void;
};

const SnapStep: FC<Props> = () => {
  return (
    <Fragment>
      <H3>Snap</H3>
    </Fragment>
  );
};

export default SnapStep;

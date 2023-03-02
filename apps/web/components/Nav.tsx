import Button from "./Button";
import { H1 } from "./Text";

const Nav = () => {
  return (
    <nav className="flex justify-between my-4">
      <H1>Home</H1>
      <Button className="py-2 max-w-[200px]">Start voting!</Button>
    </nav>
  );
};

export default Nav;

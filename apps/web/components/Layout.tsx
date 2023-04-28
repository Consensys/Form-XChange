import Head from "next/head";
import { twMerge } from "tailwind-merge";
import Nav from "./Nav";

type Props = {
  description?: string;
  title?: string;
  className?: string;
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({
  children,
  title,
  description,
  className,
}) => {
  const rootClassName = twMerge(
    "px-4 md:px-24 text-primary-black  bg-gradient-to-br from-[#ebf1ff] via-white to-[#fffff2] min-h-screen",
    className ? className : ""
  );
  return (
    <div className={rootClassName}>
      <div className="max-w-screen-xl mx-auto">
        <Head>
          <title>{title}</title>
          <meta name="description" content={`${description}`} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Nav />
        <main className="">{children}</main>
      </div>
    </div>
  );
};

Layout.defaultProps = {
  title: "form-XChange",
  description:
    "A example monorepo of building a form application on top of all Consensys products",
};

export default Layout;

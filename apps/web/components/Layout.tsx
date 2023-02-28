import Head from "next/head";
import Nav from "./Nav";

type Props = {
  description?: string;
  title?: string;
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children, title, description }) => {
  return (
    <div className="min-h-full px-32 text-primary-black">
      <Head>
        <title>{title}</title>
        <meta name="description" content={`${description}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <main className="">{children}</main>

      <footer> Footer </footer>
    </div>
  );
};

Layout.defaultProps = {
  title: "ZK-Vote dApp",
  description:
    "A example monorepo of building a voting application on top of all Consensys products and zk-evm",
};

export default Layout;

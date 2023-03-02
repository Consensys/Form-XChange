import { MetaMaskProvider } from "../components/MetamaskProvider";
import { ConnectionProvider } from "../hooks/useNetwork";
import { useHasMounted } from "../hooks/useHasMounted";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return null;
  }

  return (
    <MetaMaskProvider>
      <ConnectionProvider>
        <Component {...pageProps} />
      </ConnectionProvider>
    </MetaMaskProvider>
  );
}
export default MyApp;

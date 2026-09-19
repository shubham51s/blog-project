import AppRoutes from "./routes";
import GlobalLoaderComp from "./components/Common/globalLoader";
import AppErrorPage from "./pages/Error";
import NoInternetPage from "./pages/NoInternet";
import { useContext } from "react";
import { UserContext } from "./context/userContext";
import useOnlineStatus from "./hooks/onlineStatus";

function App() {
  const { isInitialLoading, isAnyErr } = useContext(UserContext);
  const isOnline = useOnlineStatus();

  if (isInitialLoading) return <GlobalLoaderComp />;
  if (isAnyErr) return <AppErrorPage />;
  if (!isOnline) return <NoInternetPage />;

  return <AppRoutes />;

  // onPointerDownOutside={(e) => e.preventDefault()}
}

export default App;

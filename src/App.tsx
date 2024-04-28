import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthProvider/AuthProvider";
import Routes from "./routes";

import "react-toastify/dist/ReactToastify.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </>
  );
};

export default App;

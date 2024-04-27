import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthProvider/AuthProvider";
import Routes from "./routes";

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

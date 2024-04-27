import Cookies from "js-cookie";
import {
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  Route,
  RouterProvider,
} from "react-router-dom";
import Reservation from "../pages/Manager/reservations/Reservations";
import LoginPage from "../pages/Public/Login/LoginPage";
import AuthValidation from "./AuthValidation";

const hasTokenRedirect = () => {
  const token = Cookies.get("wonders_token");

  if (token) {
    return redirect("/reservation");
  }
  return null;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<LoginPage />} loader={hasTokenRedirect} />

      {/* auth required */}
      <Route element={<AuthValidation />}>
        <Route path="/reservation" element={<Reservation />} />
      </Route>
      <Route path="/*" loader={() => redirect("/login")} />
    </Route>
  )
);

const Routes: React.FunctionComponent = () => (
  <RouterProvider router={router} />
);

export default Routes;

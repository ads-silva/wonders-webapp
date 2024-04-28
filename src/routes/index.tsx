import Cookies from "js-cookie";
import {
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  Route,
  RouterProvider,
} from "react-router-dom";
import Reservations from "../pages/Manager/reservations/Reservations";
import LoginPage from "../pages/Public/Login/LoginPage";
import AuthValidation from "./AuthValidation";
import NewReservation from "../pages/Manager/reservations/newReservation";
import ReservationDetails from "../pages/Manager/reservations/ReservationDetails";

const hasTokenRedirect = () => {
  const token = Cookies.get("wonders_token");

  if (token) {
    return redirect("/reservations");
  }
  return null;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<LoginPage />} loader={hasTokenRedirect} />

      {/* auth required */}
      <Route element={<AuthValidation />}>
        <Route path="/reservations">
          <Route index element={<Reservations />} />
          <Route path=":reservationId" element={<ReservationDetails />} />
        </Route>
        <Route path="/new-reservation" element={<NewReservation />} />
      </Route>
      <Route path="/*" loader={() => redirect("/login")} />
    </Route>
  )
);

const Routes: React.FunctionComponent = () => (
  <RouterProvider router={router} />
);

export default Routes;

import CreateUserForm from "./features/users/components/CreateUserForm";
import Home from "./components/HomePage";
import LoginForm2 from "./features/users/components/LoginForm2";
import { Route, createRoutesFromElements, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SavingPlanDetail from "./features/savings/SavingPlanDetail";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./RootLayout";
import { NotFoundPage } from "./components/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";
import { useSelector } from "react-redux";
import { SelectUserInfo } from "./features/auth/authSlice";

function App() {

  const userInfo = useSelector(SelectUserInfo)
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout />}>
        <Route element={<LandingPage />} path="/landing/">
          <Route element={<LoginForm2 />} path="login" />
          <Route element={<CreateUserForm />} path="register" />
        </Route>
        {/* <Route element={<LandingPage />} path="/landing/:id" /> */}
        {/* loader={homeLoader(dispatch)} */}

        <Route element={<ProtectedRoute />}>
          <Route index element={userInfo ? <Home /> : <Navigate to='/landing' />} path="/" />
          <Route element={userInfo ? <SavingPlanDetail /> :  <Navigate to='/landing' />} path="/saving_plan/:id" />
        </Route>

        <Route element={<NotFoundPage />} path="*" />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;

/* <Route
          index
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
          path="/"
        />
        <Route
          element={
            <ProtectedRoute>
              <SavingPlanDetail />
            </ProtectedRoute>
          }
          path="/saving_plan/:id"
        /> */

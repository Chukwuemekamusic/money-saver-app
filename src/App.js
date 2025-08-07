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
import { SelectUserInfo } from "./features/auth/authSliceNew";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Verification from "./components/Verification";
import CheckEmail from "./features/users/components/CheckEmail";
import AuthCallback from "./features/users/components/AuthCallback";
import SupabaseLoginForm from "./features/users/components/SupabaseLoginForm";
import SupabaseRegisterForm from "./features/users/components/SupabaseRegisterForm";

function App() {

  const userInfo = useSelector(SelectUserInfo)
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout />}>
        <Route element={userInfo ? <Navigate to='/' /> : <LandingPage />} path="/landing/">
          <Route element={userInfo ? <Navigate to='/' /> : <SupabaseLoginForm />} path="login" />
          <Route element={userInfo ? <Navigate to='/' /> : <SupabaseRegisterForm />} path="register" />
        </Route>
        {/* Legacy auth components (keeping for fallback) */}
        <Route element={userInfo ? <Navigate to='/' /> : <LoginForm2 />} path="/legacy/login" />
        <Route element={userInfo ? <Navigate to='/' /> : <CreateUserForm />} path="/legacy/register" />
        <Route element={<Verification />} path="/verify-email/:uidb64/:token/" />
        <Route element={<CheckEmail />} path="/check-email" />
        <Route element={<AuthCallback />} path="/auth/callback" />
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

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
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

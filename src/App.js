import { useEffect, useState } from "react";
// import PaymentButtons from "./components/PaymentButtons";
// import SavingPlanForm from "./components/SavingPlanForm";
// import SavingSummary from "./components/SavingSummary";
import CreateUserForm from "./features/users/components/CreateUserForm";
import Home, { homeLoader } from "./components/HomePage";

// import LoginForm from "./features/users/components/LoginForm";
import LoginForm from "./features/users/components/LoginForm2";
import LoginForm2 from "./features/users/components/LoginForm2";
import { Routes, Route, createRoutesFromElements } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SavingPlanDetail from "./features/savings/SavingPlanDetail";
import Navbar from "./components/Navbar";
import useCheckAuth from "./features/auth/utils/useCheckAuth";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./RootLayout";
import { NotFoundPage } from "./components/NotFoundPage";
import { useDispatch } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   checkAuth()
  // }, [])
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout />}>
        <Route element={<LandingPage />} path="/landing/">
          <Route element={<LoginForm2 />} path="login" />
          <Route element={<CreateUserForm />} path="register" />
        </Route>
        {/* <Route element={<LandingPage />} path="/landing/:id" /> */}
        {/* loader={homeLoader(dispatch)} */}
        <Route
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
        />

        <Route element={<NotFoundPage />} path="*" />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;

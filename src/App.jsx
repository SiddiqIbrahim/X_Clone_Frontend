import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Home/HomePage";
import Login from "./Pages/auth/login/Login";
import SignUpPage from "./Pages/auth/Signup/SignUpPage";
import Sidebar from "./componentes/common/Sidebar";
import RightPanel from "./componentes/common/RightPanel";
import NotificationPage from "./Pages/auth/notification/NotificationPage";
import ProfilePage from "./Pages/profile/ProfilePage";
import { Toaster } from "react-hot-toast";
import { baseUrl } from "./constant/url";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./componentes/common/LoadingSpinner";

const App = () => {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch(`${baseUrl}/api/auth/me`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.error) {
          return null;
        }
        if (!res.ok) {
          throw new Error(data.error || "Something went Wrong");
        }

        return data;
      } catch (error) {
        throw error;
      }
    },
    retry: false,
  });
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  return (
    <div className="flex max-w-6xl mx-auto">
      {authUser && <Sidebar />}
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/notifications"
          element={authUser ? <NotificationPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile/:username"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>
      {authUser && <RightPanel />}
      <Toaster />
    </div>
  );
};

export default App;

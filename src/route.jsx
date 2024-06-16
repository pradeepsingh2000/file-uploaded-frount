import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import PrivateRoutes from "./routes/protectedRoutes";
import Login from "./pages/login";
import PublicRoutes from "./routes/publicRoutes";
import Register from "./pages/register";

const ReactRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
      <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
      </Route>
      <Route element={<PublicRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default ReactRoutes;

import React from "react";
import { Routes, Route } from "react-router-dom";
import {
Admin,
Home,
Login,
// Register,
UserProfile,
Proyectos
// PageNotFound,
} from "./containers";


export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/proyectos" element={<Proyectos />} />
      {/* <Route path="/register" element={<Register />} /> */}
      {/* <Route path="*" exact={true} element={<PageNotFound />} /> */}
    </Routes>
  );
}

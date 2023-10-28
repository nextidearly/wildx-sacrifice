import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const ComingSoon = lazy(() => import("pages/ComingSoon"));
const Home = lazy(() => import("pages/Home"));
const Swap = lazy(() => import("pages/Swap"));
const Liquidity = lazy(() => import("pages/Liquidity"));
const NotFound = lazy(() => import("pages/Notfound"));
const Farms = lazy(() => import("pages/Farms"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <ComingSoon />,
  },
]);

export default router;

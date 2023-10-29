import React, { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const ComingSoon = lazy(() => import("pages/ComingSoon"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <ComingSoon />,
  },
]);

export default router;

import React from "react";

import Header from "./Header";

export default function index({ children }) {
  return (
    <div className="">
      <Header />
      <div className="flex w-full justify-center items-center mt-10">
        {children}
      </div>
    </div>
  );
}

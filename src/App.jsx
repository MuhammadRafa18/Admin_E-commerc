import React from "react";
import { MainRoute } from "./Route/MainRoute";
import { PagesProvider } from "./Store/PagesProvider";
import { AuthProvider } from "./Store/AuthContext";

export default function App() {
  return (
    <>
      <AuthProvider>
        <PagesProvider>
          <MainRoute />
        </PagesProvider>
      </AuthProvider>
    </>
  );
}

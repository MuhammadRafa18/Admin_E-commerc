import React from "react";
import { MainRoute } from "./Route/MainRoute";
import { ProdukProvider } from "./Store/ProdukProvider";
import { PagesProvider } from "./Store/PagesProvider";
import { AuthProvider } from "./Store/AuthContext";

export default function App() {
  return (
    <>
      <ProdukProvider>
        <AuthProvider>
          <PagesProvider>
            <MainRoute />
          </PagesProvider>
        </AuthProvider>
      </ProdukProvider>
    </>
  );
}

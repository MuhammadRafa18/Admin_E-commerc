import React from "react";
import { MainRoute } from "./Route/MainRoute";
import { ProdukProvider } from "./Context/ProdukProvider";
import { PagesProvider } from "./Context/PagesProvider";
import { AuthProvider } from "./Context/AuthContext";

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

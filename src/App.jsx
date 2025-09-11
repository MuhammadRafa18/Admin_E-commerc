import React from "react";
import { MainRoute } from "./Route/MainRoute";
import { ProdukProvider } from "./Context/ProdukProvider";
import { PagesProvider } from "./Context/PagesProvider";

export default function App() {
  return (
    <>
      <ProdukProvider>
        <PagesProvider>
          <MainRoute />
        </PagesProvider>
      </ProdukProvider>
    </>
  );
}

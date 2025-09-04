import React from 'react'
import { MainRoute } from './Route/MainRoute'
import { ProdukProvider } from './Context/ProdukProvider'

export default function App() {
  return (
    <>
    <ProdukProvider>
    <MainRoute/>
    </ProdukProvider>
    </>
  )
}

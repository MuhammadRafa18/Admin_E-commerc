import React from 'react'
import { Route, Routes } from 'react-router'
import { AdminLayout } from '../Componen/AdminLayout'
import { ProdukPage } from '../Componen/ProdukPage'
import { User } from '../Componen/User'
import { FormProduk } from '../Componen/FormProduk'
import { FormUser } from '../Componen/FormUser'

export const MainRoute = () => {
  return (
    <Routes>
        <Route path='/' element={<AdminLayout/>}/>
        <Route path='/ProdukPage' element={<ProdukPage/>}/>
        <Route path='/User' element={<User/>}/>
      
      <Route path='/FormProduk' element={<FormProduk/>} />
     
      <Route path='/FormUser' element={<FormUser/>} />
  
    </Routes>
  )
}

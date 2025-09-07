import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminLayout } from '../Componen/AdminLayout'
import { ProdukPage } from '../Componen/ProdukPage'
import { User } from '../Componen/User'
import { FormProduk } from '../Componen/FormProduk'
import { FormUser } from '../Componen/FormUser'
import { Login } from '../Componen/Login'
import { ProdukContext } from '../Context/ProdukProvider'
import { RouteSuperAdmin } from './RouteSuperAdmin'

export const MainRoute = () => {
  const { isLogin, } = useContext(ProdukContext) 
  return (
    <Routes>
        <Route path='/' element={ isLogin === "Admin" || isLogin === "SuperAdmin" ? <AdminLayout/> : <Navigate to="/Login"/> }/>
        <Route path='/ProdukPage' element={<ProdukPage/>}/>
        <Route path='/User' element={ <RouteSuperAdmin><User/></RouteSuperAdmin>  }/>
      
      <Route path='/FormProduk' element={<RouteSuperAdmin><FormProduk/></RouteSuperAdmin>} />
      <Route path='/FormUser' element={<FormUser/> } />
      <Route path='/Login' element={ isLogin === null ? <Login/> : <Navigate to="/"/>}/>
  
    </Routes>
  )
}

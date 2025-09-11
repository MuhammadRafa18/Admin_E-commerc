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
import { Categories } from '../Componen/Categories'
import { FormCategories } from '../Componen/FormCategories'
import { FormType } from '../Componen/FormType'
import { Type } from '../Componen/Type'
import { ProdukType } from '../Home/ProdukType'
import { Result } from '../Home/Result'
import { FormProdukType } from '../Home/FormProdukType'
import { FormResult } from '../Home/FormResult'
import { Section } from '../About/Section'
import { Power } from '../About/Power'
import { ParagrafAbout } from '../About/ParagrafAbout'
import { ParagrafSection } from '../About/ParagrafSection'
import { FormParagrafSection } from '../About/FormParagrafSection'
import { FormParagrafAbout } from '../About/FormParagrafAbout'
import { FormPower } from '../About/FormPower'
import { FormSection } from '../About/FormSection'
import { Faq } from '../Faq/Faq'
import { FormFaq } from '../Faq/FormFaq'
import { FormPayment } from '../Componen/FormPayment'
import { Payment } from '../Componen/Payment'
import { Delevery } from '../Componen/Delevery'
import { FormDelevery } from '../Componen/FormDelevery'
import { FormProvinci } from '../Componen/FormProvinci'
import { Provinci } from '../Componen/Provinci'
import { City } from '../Componen/City'
import { FormCity } from '../Componen/FormCity'
import { Home } from '../Componen/Home'

export const MainRoute = () => {
  const { isLogin, } = useContext(ProdukContext) 
  return (
    <Routes>
        <Route path='/' element={ isLogin === "Admin" || isLogin === "SuperAdmin" ? <Home/> : <Navigate to="/Login"/> }/>
        {/* Route Data */}
        <Route path='/ProdukPage' element={  isLogin === "Admin" || isLogin === "SuperAdmin" ? <ProdukPage/>: <Navigate to="/Login"/> }/>
        <Route path='/User' element={ <RouteSuperAdmin><User/></RouteSuperAdmin>  }/>
      
      <Route path='/FormProduk' element={ isLogin === "Admin" || isLogin === "SuperAdmin" ? <FormProduk/>: <Navigate to="/Login"/>} />
      <Route path='/FormUser' element={ <RouteSuperAdmin><FormUser/></RouteSuperAdmin>  } />
      <Route path='/Login' element={ isLogin === null ? <Login/> : <Navigate to="/"/>}/>
      <Route path='/Categories' element={ isLogin === "Admin" || isLogin === "SuperAdmin" ?<Categories/> : <Navigate to="/Login"/> } />
      <Route path='/FormCategories' element={ isLogin === "Admin" || isLogin === "SuperAdmin" ?<FormCategories/>: <Navigate to="/Login"/> } />
      <Route path='/FormType' element={ isLogin === "Admin" || isLogin === "SuperAdmin" ?<FormType/>: <Navigate to="/Login"/> } />
      <Route path='/Type' element={ isLogin === "Admin" || isLogin === "SuperAdmin" ?<Type/>: <Navigate to="/Login"/> } />
      <Route path='/FormPayment' element={ isLogin === "Admin" || isLogin === "SuperAdmin" ?<FormPayment/> : <Navigate to="/Login"/> } />
      <Route path='/Payment' element={ isLogin === "Admin" || isLogin === "SuperAdmin" ?<Payment/> : <Navigate to="/Login"/> } />
      <Route path='/Delevery' element={ isLogin === "Admin" || isLogin === "SuperAdmin" ?<Delevery/> : <Navigate to="/Login"/> } />
      <Route path='/FormDelevery' element={ isLogin === "Admin" || isLogin === "SuperAdmin" ?<FormDelevery/> : <Navigate to="/Login"/> } />
      <Route path='/FormProvinci' element={ isLogin === "Admin" || isLogin === "SuperAdmin" ?<FormProvinci/> : <Navigate to="/Login"/> } />
      <Route path='/Provinci' element={ isLogin === "Admin" || isLogin === "SuperAdmin" ?<Provinci/> : <Navigate to="/Login"/> } />
      <Route path='/City' element={ isLogin === "Admin" || isLogin === "SuperAdmin" ?<City/> : <Navigate to="/Login"/> } />
      <Route path='/FormCity' element={ isLogin === "Admin" || isLogin === "SuperAdmin" ?<FormCity/> : <Navigate to="/Login"/> } />
      {/* Route Home */}
      <Route path='/ProdukType' element={ isLogin === "Admin" || isLogin === "SuperAdmin" ?<ProdukType/> : <Navigate to="/Login"/> } />
      <Route path='/FormProdukType' element={ isLogin === "Admin" || isLogin === "SuperAdmin" ?<FormProdukType/> : <Navigate to="/Login"/> } />
      <Route path='/FormResult' element={ isLogin === "Admin" || isLogin === "SuperAdmin" ?<FormResult/> : <Navigate to="/Login"/> } />
      <Route path='/Result' element={ isLogin === "Admin" || isLogin === "SuperAdmin" ?<Result/> : <Navigate to="/Login"/> } />
      {/* Route About */}
      <Route path='/Section' element={ isLogin === "Admin" || isLogin === "SuperAdmin" ?<Section/> : <Navigate to="/Login"/> } />
      <Route path='/FormSection' element={ isLogin === "Admin" || isLogin === "SuperAdmin" ?<FormSection/> : <Navigate to="/Login"/> } />
      <Route path='/Power' element={ isLogin === "Admin" || isLogin === "SuperAdmin" ?<Power/> : <Navigate to="/Login"/> } />
      <Route path='/FormPower' element={ isLogin === "Admin" || isLogin === "SuperAdmin" ?<FormPower/> : <Navigate to="/Login"/> } />
      <Route path='/ParagrafAbout' element={ isLogin === "Admin" || isLogin === "SuperAdmin" ?<ParagrafAbout/> : <Navigate to="/Login"/> } />
      <Route path='/FormParagrafAbout' element={ isLogin === "Admin" || isLogin === "SuperAdmin" ?<FormParagrafAbout/> : <Navigate to="/Login"/> } />
      <Route path='/ParagrafSection' element={ isLogin === "Admin" || isLogin === "SuperAdmin" ?<ParagrafSection/> : <Navigate to="/Login"/> } />
      <Route path='/FormParagrafSection' element={ isLogin === "Admin" || isLogin === "SuperAdmin" ?<FormParagrafSection/> : <Navigate to="/Login"/> } />
      {/* Route Faq */}
      <Route path='/Faq' element={ isLogin === "Admin" || isLogin === "SuperAdmin" ?<Faq/> : <Navigate to="/Login"/> } />
      <Route path='/FormFaq' element={ isLogin === "Admin" || isLogin === "SuperAdmin" ?<FormFaq/> : <Navigate to="/Login"/> } />
    </Routes>
  )
}

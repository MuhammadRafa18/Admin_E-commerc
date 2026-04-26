import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import { Layouts } from '../Layouts/Layouts'
import { UserAdmin } from '../Pages/UserAdmin'
import { ProdukPage } from '../Pages/ProdukPage'
import { Categories } from '../Pages/Categories'
import { Type } from '../Pages/Type'
import { Banner } from '../Pages/Banner'
import { Result } from '../Pages/Result'
import { Order } from '../Pages/Order'
import { Home } from '../Pages/Home'
import { About } from '../Pages/About'
import { Faq } from '../Pages/Faq'
import { DetailFaq } from '../Pages/DetailFaq'
import { FormProduk } from '../Form/FormProduk'
import { FormUserAdmin } from '../Form/FormUserAdmin'
import { FormCategories } from '../Form/FormCategories'
import { FormType } from '../Form/FormType'
import { FormBanner } from '../Form/FormBanner'
import { FormResult } from '../Form/FormResult'
import { FormDetailFaq } from '../Form/FormDetailFaq'
import { FormFaq } from '../Form/FormFaq'
import { Login } from '../Pages/auth/Login'
import { RouteSuperAdmin } from './RouteSuperAdmin'
import { AuthContext } from '../Store/AuthContext'


export const MainRoute = () => {
  const { token } = useContext(AuthContext)
  return (
    <Routes>
      <Route element={<Layouts />}>
        <Route path='/' element={ <PrivateRoute><Home/></PrivateRoute>   }/>
        <Route path='/ProdukPage' element={ <PrivateRoute><ProdukPage/></PrivateRoute>   }/>
        <Route path='/UserAdmin' element={ <RouteSuperAdmin><UserAdmin/></RouteSuperAdmin>  }/>
        <Route path='/Categories' element={ <PrivateRoute><Categories/></PrivateRoute>  } />
        <Route path='/Type' element={ <PrivateRoute><Type/></PrivateRoute> } />
        <Route path='/Banner' element={ <PrivateRoute><Banner/></PrivateRoute>} />
        <Route path='/Result' element={ <PrivateRoute><Result/></PrivateRoute>} />
        <Route path='/Order' element={<PrivateRoute><Order/></PrivateRoute>} />
        <Route path='/About' element={ <PrivateRoute><About/> </PrivateRoute> } />
        <Route path='/Faq' element={ <PrivateRoute><Faq/></PrivateRoute>  } />
        <Route path='/DetailFaq' element={ <PrivateRoute><DetailFaq/></PrivateRoute>  } />
      </Route>

   
        {/* Route Form Data */}
        <Route path='/FormProduk' element={ <PrivateRoute><FormProduk/></PrivateRoute> } />
        <Route path='/FormUserAdmin' element={ <RouteSuperAdmin><FormUserAdmin/></RouteSuperAdmin>  } />
        <Route path='/FormCategories' element={ <PrivateRoute><FormCategories/></PrivateRoute> } />
        <Route path='/FormType' element={ <PrivateRoute><FormType/></PrivateRoute>  } />


        {/* Route Form Home */}
        <Route path='/FormBanner' element={ <PrivateRoute><FormBanner/></PrivateRoute>} />
        <Route path='/FormResult/' element={ <PrivateRoute><FormResult/></PrivateRoute>} />
      
        {/* Route Form Faq */}
        <Route path='/FormDetailFaq' element={ <PrivateRoute><FormDetailFaq/></PrivateRoute>  } />
        <Route path='/FormFaq' element={ <PrivateRoute><FormFaq/></PrivateRoute>  } />
        
        {/* Route Login */}
        <Route path='/Login' element={ token ? <Navigate to="/"/>  :  <Login/> }/>

     
         
    </Routes>
  )
}

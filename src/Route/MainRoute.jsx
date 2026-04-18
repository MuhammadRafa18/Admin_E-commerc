import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ProdukPage } from '../Pages/ProdukPage'
import { UserAdmin } from '../Pages/UserAdmin'
import { FormProduk } from '../Data_Product/form/FormProduk'
import { FormUserAdmin } from '../Data_Product/form/FormUserAdmin'
import { Login } from '../Pages/auth/Login'
import { RouteSuperAdmin } from './RouteSuperAdmin'
import { Categories } from '../Pages/Categories'
import { FormCategories } from '../Data_Product/form/FormCategories'
import { FormType } from '../Data_Product/form/FormType'
import { Type } from '../Pages/Type'
import { About } from '../About/About'
import { Faq } from '../Pages/Faq'
import { FormFaq } from '../Faq/form/FormFaq'
import { AuthContext } from '../Store/AuthContext'
import { DetailFaq } from '../Pages/DetailFaq'
import { FormDetailFaq } from '../Faq/form/FormDetailFaq'
import { Banner } from '../Pages/Banner'
import { FormBanner } from '../Home/form/FormBanner'
import { Order } from '../Pages/Order'
import { FormResult } from '../Home/form/FormResult'
import { Result } from '../Pages/Result'
import { Home } from '../Pages/Home'
import PrivateRoute from './PrivateRoute'
import { Layouts } from '../Layouts/Layouts'

export const MainRoute = () => {
   const { token } = useContext(AuthContext);
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
        <Route path='/FormProduk/:id' element={  <PrivateRoute><FormProduk/></PrivateRoute> } />
        <Route path='/FormUserAdmin' element={ <RouteSuperAdmin><FormUserAdmin/></RouteSuperAdmin>  } />
        <Route path='/FormUserAdmin/:id' element={ <RouteSuperAdmin><FormUserAdmin/></RouteSuperAdmin>  } />
        <Route path='/FormCategories' element={ <PrivateRoute><FormCategories/></PrivateRoute> } />
        <Route path='/FormCategories/:id' element={ <PrivateRoute><FormCategories/></PrivateRoute> } />
        <Route path='/FormType' element={ <PrivateRoute><FormType/></PrivateRoute>  } />
        <Route path='/FormType/:id' element={ <PrivateRoute><FormType/></PrivateRoute>  } />

        {/* Route Form Home */}
        <Route path='/FormBanner' element={ <PrivateRoute><FormBanner/></PrivateRoute>} />
        <Route path='/FormBanner/:id' element={ <PrivateRoute><FormBanner/></PrivateRoute>} />
        <Route path='/FormResult/' element={ <PrivateRoute><FormResult/></PrivateRoute>} />
        <Route path='/FormResult/:id' element={ <PrivateRoute><FormResult/></PrivateRoute>} />
      
        {/* Route Form About */} 
        {/* Route Form Faq */}
        <Route path='/FormDetailFaq' element={ <PrivateRoute><FormDetailFaq/></PrivateRoute>  } />
        <Route path='/FormDetailFaq/:id' element={ <PrivateRoute><FormDetailFaq/></PrivateRoute>  } />
        <Route path='/FormFaq' element={ <PrivateRoute><FormFaq/></PrivateRoute>  } />
        <Route path='/FormFaq/:id' element={ <PrivateRoute><FormFaq/></PrivateRoute>  } />
        {/* Route Login */}
        <Route path='/Login' element={ token ? <Navigate to="/"/>  :  <Login/> }/>

     
         
    </Routes>
  )
}

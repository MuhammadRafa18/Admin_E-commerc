import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ProdukPage } from '../Componen/ProdukPage'
import { UserAdmin } from '../Componen/UserAdmin'
import { FormProduk } from '../Componen/form/FormProduk'
import { FormUserAdmin } from '../Componen/form/FormUserAdmin'
import { Login } from '../Componen/auth/Login'
import { RouteSuperAdmin } from './RouteSuperAdmin'
import { Categories } from '../Componen/Categories'
import { FormCategories } from '../Componen/form/FormCategories'
import { FormType } from '../Componen/form/FormType'
import { Type } from '../Componen/Type'
import { ProdukType } from '../Home/ProdukType'
import { FormProdukType } from '../Home/form/FormProdukType'
import { Power } from '../About/Power'
import { ParagrafAbout } from '../About/ParagrafAbout'
import { VisiMisi } from '../About/VisiMisi'
import { FormVisiMisi } from '../About/form/FormVisiMisi'
import { FormParagrafAbout } from '../About/form/FormParagrafAbout'
import { FormPower } from '../About/form/FormPower'
import { Faq } from '../Faq/Faq'
import { FormFaq } from '../Faq/form/FormFaq'
import { AuthContext } from '../Context/AuthContext'
import { DetailFaq } from '../Faq/DetailFaq'
import { FormDetailFaq } from '../Faq/form/FormDetailFaq'
import { Banner } from '../Home/Banner'
import { FormBanner } from '../Home/form/FormBanner'
import { Order } from '../Order/Order'
import { FormResult } from '../Home/form/FormResult'
import { Result } from '../Home/Result'
import { Home } from '../DashboardHome/Home'
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
        <Route path='/ProdukType' element={ <PrivateRoute><ProdukType/></PrivateRoute> } />
        <Route path='/Banner' element={ <PrivateRoute><Banner/></PrivateRoute>} />
        <Route path='/Result' element={ <PrivateRoute><Result/></PrivateRoute>} />
        <Route path='/Order' element={<PrivateRoute><Order/></PrivateRoute>} />
        <Route path='/Power' element={ <PrivateRoute><Power/>  </PrivateRoute>} />
        <Route path='/VisiMisi' element={ <PrivateRoute><VisiMisi/> </PrivateRoute> } />
        <Route path='/ParagrafAbout' element={ <PrivateRoute><ParagrafAbout/></PrivateRoute>  } />
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
        <Route path='/FormProdukType' element={ <PrivateRoute><FormProdukType/></PrivateRoute>   } />
        <Route path='/FormProdukType/:id' element={ <PrivateRoute><FormProdukType/></PrivateRoute>   } />
        <Route path='/FormBanner' element={ <PrivateRoute><FormBanner/></PrivateRoute>} />
        <Route path='/FormBanner/:id' element={ <PrivateRoute><FormBanner/></PrivateRoute>} />
        <Route path='/FormResult/' element={ <PrivateRoute><FormResult/></PrivateRoute>} />
        <Route path='/FormResult/:id' element={ <PrivateRoute><FormResult/></PrivateRoute>} />
      
        {/* Route Form About */} 
        <Route path='/FormPower' element={ <PrivateRoute><FormPower/> </PrivateRoute> } />
        <Route path='/FormPower/:id' element={ <PrivateRoute><FormPower/> </PrivateRoute> } />
        <Route path='/FormParagrafAbout' element={ <PrivateRoute><FormParagrafAbout/></PrivateRoute>  } />
        <Route path='/FormParagrafAbout/:id' element={ <PrivateRoute><FormParagrafAbout/>  </PrivateRoute>} />
        <Route path='/FormVisiMisi' element={ <PrivateRoute><FormVisiMisi/> </PrivateRoute> } />
        <Route path='/FormVisiMisi/:id' element={ <PrivateRoute><FormVisiMisi/></PrivateRoute>  } />
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

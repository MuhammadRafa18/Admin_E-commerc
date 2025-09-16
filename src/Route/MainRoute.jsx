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
import PrivateRoute from './PrivateRoute'
import { AuthContext } from '../Context/AuthContext'

export const MainRoute = () => {
   const { token } = useContext(AuthContext);
  return (
    <Routes>
        <Route path='/' element={ <PrivateRoute><Home/></PrivateRoute>   }/>
        {/* Route Data */}
        <Route path='/ProdukPage' element={ <PrivateRoute><ProdukPage/></PrivateRoute>   }/>
        <Route path='/User' element={ <RouteSuperAdmin><User/></RouteSuperAdmin>  }/>
      
      <Route path='/FormProduk' element={ <PrivateRoute><FormProduk/></PrivateRoute> } />
      <Route path='/FormProduk/:id' element={  <PrivateRoute><FormProduk/></PrivateRoute> } />
      <Route path='/FormUser' element={ <RouteSuperAdmin><FormUser/></RouteSuperAdmin>  } />
      <Route path='/FormUser/:id' element={ <RouteSuperAdmin><FormUser/></RouteSuperAdmin>  } />
      <Route path='/Login' element={ token ? <Navigate to="/"/>  :  <Login/> }/>
      <Route path='/Categories' element={ <PrivateRoute><Categories/></PrivateRoute>  } />
      <Route path='/FormCategories' element={ <PrivateRoute><FormCategories/></PrivateRoute> } />
      <Route path='/FormCategories/:id' element={ <PrivateRoute><FormCategories/></PrivateRoute> } />
      <Route path='/FormType' element={ <PrivateRoute><FormType/></PrivateRoute>  } />
      <Route path='/FormType/:id' element={ <PrivateRoute><FormType/></PrivateRoute>  } />
      <Route path='/Type' element={ <PrivateRoute><Type/></PrivateRoute> } />
      <Route path='/FormPayment' element={ <PrivateRoute><FormPayment/></PrivateRoute> }/>
      <Route path='/FormPayment/:id' element={ <PrivateRoute><FormPayment/></PrivateRoute> }/>
      <Route path='/Payment' element={ <PrivateRoute><Payment/></PrivateRoute>  } />
      <Route path='/Delevery' element={ <PrivateRoute><Delevery/></PrivateRoute>  } />
      <Route path='/FormDelevery' element={ <PrivateRoute><FormDelevery/></PrivateRoute>  } />
      <Route path='/FormDelevery/:id' element={ <PrivateRoute><FormDelevery/></PrivateRoute>  } />
      <Route path='/FormProvinci' element={ <PrivateRoute><FormProvinci/></PrivateRoute> } />
      <Route path='/FormProvinci/:id' element={ <PrivateRoute><FormProvinci/></PrivateRoute> } />
      <Route path='/Provinci' element={ <PrivateRoute><Provinci/> </PrivateRoute>  } />
      <Route path='/City' element={ <PrivateRoute><City/> </PrivateRoute>  } />
      <Route path='/FormCity' element={ <PrivateRoute><FormCity/> </PrivateRoute> } />
      <Route path='/FormCity/:id' element={ <PrivateRoute><FormCity/> </PrivateRoute> } />
      {/* Route Home */}
      <Route path='/ProdukType' element={ <PrivateRoute><ProdukType/></PrivateRoute> } />
      <Route path='/FormProdukType' element={ <PrivateRoute><FormProdukType/></PrivateRoute>   } />
      <Route path='/FormProdukType/:id' element={ <PrivateRoute><FormProdukType/></PrivateRoute>   } />
      <Route path='/FormResult' element={ <PrivateRoute><FormResult/></PrivateRoute>   } />
      <Route path='/FormResult/:id' element={ <PrivateRoute><FormResult/></PrivateRoute>  } />
      <Route path='/Result' element={ <PrivateRoute><Result/> </PrivateRoute> } />
      {/* Route About */}
      <Route path='/Section' element={ <PrivateRoute><Section/> </PrivateRoute> } />
      <Route path='/FormSection' element={ <PrivateRoute><FormSection/></PrivateRoute>  } />
      <Route path='/FormSection/:id' element={ <PrivateRoute><FormSection/></PrivateRoute>  } />
      <Route path='/Power' element={ <PrivateRoute><Power/>  </PrivateRoute>} />
      <Route path='/FormPower' element={ <PrivateRoute><FormPower/> </PrivateRoute> } />
      <Route path='/FormPower/:id' element={ <PrivateRoute><FormPower/> </PrivateRoute> } />
      <Route path='/FormParagrafAbout' element={ <PrivateRoute><FormParagrafAbout/></PrivateRoute>  } />
      <Route path='/FormParagrafAbout/:id' element={ <PrivateRoute><FormParagrafAbout/>  </PrivateRoute>} />
      <Route path='/ParagrafAbout' element={ <PrivateRoute><ParagrafAbout/></PrivateRoute>  } />
      <Route path='/ParagrafSection' element={ <PrivateRoute><ParagrafSection/> </PrivateRoute> } />
      <Route path='/FormParagrafSection' element={ <PrivateRoute><FormParagrafSection/> </PrivateRoute> } />
      <Route path='/FormParagrafSection/:id' element={ <PrivateRoute><FormParagrafSection/></PrivateRoute>  } />
      {/* Route Faq */}
      <Route path='/Faq' element={ <PrivateRoute><Faq/></PrivateRoute>  } />
      <Route path='/FormFaq' element={ <PrivateRoute><FormFaq/></PrivateRoute>  } />
      <Route path='/FormFaq/:id' element={ <PrivateRoute><FormFaq/></PrivateRoute>  } />
    </Routes>
  )
}

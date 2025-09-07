import React, { useContext } from 'react'
import { ProdukContext } from '../Context/ProdukProvider'
import { Navigate } from 'react-router';

export const RouteSuperAdmin = ({children}) => {
    const {isLogin,loading} =  useContext(ProdukContext)
    if(loading) return <div>Loading...</div>;
    if(isLogin !== "SuperAdmin"){
        return <Navigate to="/"/>
    }

    return children ;
}

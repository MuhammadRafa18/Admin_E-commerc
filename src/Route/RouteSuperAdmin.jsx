import React, { useContext } from 'react'
import { ProdukContext } from '../Context/ProdukProvider'
import { Navigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';

export const RouteSuperAdmin = ({children}) => {
    const {User,loading,token} =  useContext(AuthContext)
    if(loading) return <div>Loading...</div>;
     if (!token) {
        return <Navigate to="/login" replace />;
      }
    if(User.role !== "SuperAdmin"){
        return <Navigate to="/"/>
    }

    return  children ;
}

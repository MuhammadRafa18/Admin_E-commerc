import React, { useContext } from 'react'
import { Navigate } from 'react-router';
import { AuthContext } from '../Store/AuthContext';

export const RouteSuperAdmin = ({children}) => {
    const {User,loading,token} =  useContext(AuthContext)
    if(loading) return <div>Loading...</div>;
     if (!token) {
        return <Navigate to="/login" replace />;
      }
    if(User.role !== "super_admin"){
        return <Navigate to="/"/>
    }

    return  children ;
}

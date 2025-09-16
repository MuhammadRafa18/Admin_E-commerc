import React, { useContext } from 'react'
import { AdminLayout } from './AdminLayout'
import { ProdukContext } from '../Context/ProdukProvider'
import { AuthContext } from '../Context/AuthContext'

export const Home = () => {
    const {User} = useContext(AuthContext)
    // console.log(UserLogin.name)
  return (
    <AdminLayout>
        <h1 className='text-3xl'>Hello {User.role}</h1>
    </AdminLayout>
  )
}

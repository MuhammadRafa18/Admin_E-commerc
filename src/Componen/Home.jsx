import React, { useContext } from 'react'
import { AdminLayout } from './AdminLayout'
import { ProdukContext } from '../Context/ProdukProvider'

export const Home = () => {
    const {UserLogin} = useContext(ProdukContext)
    // console.log(UserLogin.name)
  return (
    <AdminLayout>
        <h1 className='text-3xl'>Hello {UserLogin.name}</h1>
    </AdminLayout>
  )
}

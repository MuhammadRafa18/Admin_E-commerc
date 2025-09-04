import React, { useContext } from 'react'
import { AdminLayout } from './AdminLayout'
import { useNavigate } from 'react-router'
import { ProdukContext } from '../Context/ProdukProvider'

export const User = () => {
    const {ListUser,User,setUser, setListUser} = useContext(ProdukContext)
    const navigate = useNavigate()
    const HandleEdit = (id) => {
      const Edit = ListUser.find((item) => item.id === id)
      setUser(Edit)
      navigate(`/FormUser`)
    }
    const HandleDelete = (id) => {
        const UpdateUser = ListUser.filter((item) => item.id !== id)
        setListUser(UpdateUser)
    }
  return (
    <AdminLayout>
         <div className="flex flex-col items-end space-y-2 py-8 relative overflow-x-auto  ">
           <button
             onClick={() => { setUser({}); navigate(`/FormUser`) } }
             className="w-fit bg-green-500 text-white py-2 px-5 rounded-xl cursor-pointer "
           >
             Tambah
           </button>
           <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
             <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
               <tr>
                 <th scope="col" className=" text-center px-6 py-3">
                   Email
                 </th>
                 <th scope="col" className="text-center px-6 py-3">
                   Fullname
                 </th>
                 <th scope="col" className="text-center px-6 py-3">
                   Phone
                 </th>
                 <th scope="col" className="text-center px-6 py-3">
                   Role
                 </th>
                 <th scope="col" className="text-center px-6 py-3">
                   Action
                 </th>
               </tr>
             </thead>
             <tbody>
   
           
               {ListUser.map((item) => (
               <tr key={item.id}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                 <td className="text-center px-6 py-4">{item.email}</td>
                 <td className="text-center px-6 py-4">{item.name}</td>
                 <td className="text-center px-6 py-4">{item.phone}</td>
                 <td className="text-center px-6 py-4">{item.role}</td>
                 <td className="text-center px-6 py-4 space-x-2">
                   <button onClick={() => HandleEdit(item.id)} className="bg-green-500 text-white p-2 rounded-xl cursor-pointer">
                     Edit
                   </button>
                   <button onClick={() => HandleDelete(item.id)} className="bg-red-500 text-white p-2 rounded-xl cursor-pointer">
                     Hapus
                   </button>
                 </td>
               </tr>
               ))}
             </tbody>
           </table>
         </div>
       </AdminLayout>
  )
}

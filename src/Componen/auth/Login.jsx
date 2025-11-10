import React, { useContext, useEffect, useState } from 'react'
import { ProdukContext } from '../../Context/ProdukProvider';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';

export const Login = () => {
 const [account,setAccount] = useState();
 const navigate = useNavigate();
 const { login } = useContext(AuthContext)
 const HandleLogin = async (e) => {
    e.preventDefault();
    const formuser = {
        email:account.email,
        password:account.password
    };
    try{
      const res =  await axios.post(`http://127.0.0.1:8000/api/loginAdmin`, formuser)
      login(res.data.token, res.data.user);
      // console.log(res.data)
      navigate("/");
    }catch (err){
       alert("Email atau password salah");
    }
  
 }
console.log(account)
 
 

  return (
     <section className="min-h-screen flex items-center justify-center bg-gray-secondbackground">
        <div className="w-lg bg-white rounded-xl shadow px-10 py-6">
          <h1 className="text-4xl  text-center mb-16">Sign In</h1>
          <form className="text-base" onSubmit={HandleLogin}>
            {/* <!-- Email --> */}
            <label className="block">
              <span className="sr-only">E-mail</span>
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                required
                className="w-full border rounded-md mb-4 px-5 py-3 placeholder-black"
                onChange={(e) => setAccount({...account,email:e.target.value})}
              />
            </label>
            {/* <!-- Password --> */}
            <label className="block">
              <span className="sr-only">Password</span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="w-full border rounded-md  px-5 py-3 placeholder-black"
                onChange={(e) => setAccount({...account,password:e.target.value})}

              />
            </label>
            {/* <!-- Submit Button --> */}
            <button
              type="submit"
              className="w-full bg-black text-white py-4 mt-6 rounded-full cursor-pointer"
            >
              Sign In
            </button>
          </form>
        </div>
      </section>
  )
}

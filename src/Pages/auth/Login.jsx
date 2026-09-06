import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Store/AuthContext";
import axios from "axios";
import axiosInstance from "../../services/axiosInstance";
import toast from "react-hot-toast";

export const Login = () => {
  const [account, setAccount] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const HandleLogin = async (e) => {
    e.preventDefault();
    const formuser = {
      email: account.email,
      password: account.password,
    };
    try {
      const res = await axiosInstance.post(`/auth/admin/login`, formuser);
      toast.success("Login berhasil, selamat datang kembali!");
      setTimeout(() => {
        login(res.data.token, res.data.user);
        navigate("/");
      }, 1500);
    } catch (err) {
      toast.error("Email atau password salah");
    }
  };

  return (

    // <section className="min-h-screen flex items-center justify-center bg-gray-secondbackground">
    //   <div className="w-lg bg-white rounded-xl shadow px-10 py-6">
    //     <h1 className="text-4xl text-black text-center mb-16">Sign In</h1>
    //     <form className="text-base" onSubmit={HandleLogin}>
    //       {/* <!-- Email --> */}
    //       <label className="block">
    //         <span className="sr-only">E-mail</span>
    //         <input
    //           type="email"
    //           name="email"
    //           placeholder="E-mail"
    //           required
    //           className="w-full border rounded-md mb-4 px-5 py-3 placeholder-black"
    //           onChange={(e) =>
    //             setAccount({ ...account, email: e.target.value })
    //           }
    //         />
    //       </label>
    //       {/* <!-- Password --> */}
    //       <label className="block">
    //         <span className="sr-only">Password</span>
    //         <input
    //           type="password"
    //           name="password"
    //           placeholder="Password"
    //           required
    //           className="w-full border rounded-md  px-5 py-3 placeholder-black"
    //           onChange={(e) =>
    //             setAccount({ ...account, password: e.target.value })
    //           }
    //         />
    //       </label>
    //       {/* <!-- Submit Button --> */}
    //       <button
    //         type="submit"
    //         className="w-full bg-black text-white py-4 mt-6 rounded-full cursor-pointer"
    //       >
    //         Sign In
    //       </button>
    //     </form>
    //   </div>
    // </section>
    <>
      <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">

          {/* Visual Banner - Kiri (Gunakan Unsplash Source Baru) */}
          <div
            className="hidden lg:block lg:w-1/2 bg-cover bg-center relative"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop')" }}
          >
            <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[2px]" />
          </div>

          {/* Form Section - Kanan */}
          <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Arliva</h2>
              <p className="text-sm text-slate-500 mt-2">Selamat datang kembali, silakan masuk ke akun Anda</p>
            </div>

            {/* Form Fields */}
            <form onSubmit={(e) => HandleLogin(e)} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="nama@email.com"
                  onChange={(e) =>
                    setAccount({ ...account, email: e.target.value })
                  }
                  className="w-full px-4 py-2.5 text-slate-800 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-200 placeholder:text-slate-400 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Password
                  </label>

                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    onChange={(e) =>
                      setAccount({ ...account, password: e.target.value })
                    }
                    className="w-full px-4 py-2.5 text-slate-800 bg-slate-50/50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-200 placeholder:text-slate-400 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition-colors focus:outline-none cursor-pointer"
                    aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                  >
                    {showPassword ? (
                      /* SVG Icon: Eye Off (Sembunyikan Password) */
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      /* SVG Icon: Eye (Tampilkan Password) */
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12c1.274 4.057 5.065 7 9.542 7 4.477 0 8.268-2.943 9.542-7-1.274-4.057-5.064-7-9.542-7-4.477 0-8.268 2.943-9.542 7Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    )}
                  </button>
                </div>
                <a href="#" className="block text-right pr-2 text-xs font-medium text-slate-900">
                  forget Password?
                </a>
              </div>


              {/* Primary Action Button */}
              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm cursor-pointer"
              >
                Submit
              </button>
            </form>



          </div>
        </div>
      </div>
    </>
  );
};

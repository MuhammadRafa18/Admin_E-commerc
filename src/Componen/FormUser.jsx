import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import Prev from "../assets/panah.svg";
import dropdown from "../assets/panah.svg";
import { ProdukContext } from "../Context/ProdukProvider";

export const FormUser = () => {
  const { User, setUser, setListUser, ListUser } = useContext(ProdukContext);
  const navigate = useNavigate();
  const HandleForm = (e) => {
    e.preventDefault();
    if(User.id) {
      const Edit = ListUser.map((item) => item.id === User.id ? {id:User.id,
      email: User.email,
      name: User.name,
      phone: User.phone,
      role: User.role,
      password: User.password
      } : item)
      setListUser(Edit)
        setUser({
      email: "",
      name: "",
      phone: "",
      role: "",
      password: "",
    });
    navigate(`/User`)
    } else {
    const Data = {
      id: Date.now(),
      email: User.email,
      name: User.name,
      phone: User.phone,
      role: User.role,
      password: User.password
    };
    setListUser([...ListUser, Data]);

    setUser({
      email: "",
      name: "",
      phone: "",
      role: "",
      password: "",
    });
   navigate(`/User`)
    }
  };
  // console.log(ListUser);

  return (
    <main className="py-12 bg-gray-secondbackground text-black font-sans flex justify-center items-start min-h-screen ">
      <section className="w-1/2 p-10 bg-white rounded-xl shadow ">
        <header className=" mb-6 flex items-center space-x-1 text-xl font-medium">
          <Link to="/User">
            <img src={Prev} alt="" className="rotate-90 w-6 self-start mb-1" />
          </Link>
          <h1>Settings</h1>
        </header>

        {/* <!-- Form Account --> */}
        <form className="space-y-4" onSubmit={HandleForm}>
          {/* <!-- Email --> */}
          <div className="">
            <label className="block text-base  mb-1 font-medium">Email</label>
            <input
              type="email"
              className="w-full border rounded-xl px-2.5 py-3 text-sm "
              placeholder="Your Email"
              value={User.email || ""}
              onChange={(e) => setUser({ ...User, email: e.target.value })}
              required
            />
          </div>

          {/* <!-- Fullname --> */}
          <div>
            <label className="block text-base  mb-1 font-medium">
              Fullname
            </label>
            <input
              type="text"
              className="w-full border rounded-xl px-2.5 py-3 text-sm"
              placeholder="Name"
              value={User.name || ""}
              onChange={(e) => setUser({ ...User, name: e.target.value })}
              required
            />
          </div>

          {/* <!-- Phone number --> */}
          <div>
            <label className="block text-base  mb-1 font-medium">
              Phone number
            </label>
            <div className="flex">
              <span className="bg-black text-white px-3 flex items-center rounded-l-xl">
                +62
              </span>
              <input
                type="text"
                className="w-full border rounded-r-xl px-2.5 py-3 text-sm"
                value={User.phone || ""}
                onChange={(e) => setUser({ ...User, phone: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <label className="text-base block">Role</label>
            <div className="relative group">
              <img
                src={dropdown}
                alt=""
                className="absolute right-3 bottom-4  "
              />
              <select
                className="w-full border  rounded-xl px-2.5 py-3 text-sm appearance-none  "
                onChange={(e) => setUser({ ...User, role: e.target.value })}
                value={User.role || ""}
                required
              >
                <option value="">Pilih Role</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
          </div>

          {/* <!--  Password  --> */}
          <div className="w-full">
            <label className="block text-base  mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              className="w-full border rounded-xl px-2.5 py-3 text-sm"
              placeholder="Password"
              value={User.password || ""}
              onChange={(e) => setUser({ ...User, password: e.target.value })}
              required
            />
          </div>

          {/* <!-- Button --> */}
          <div className="w-full flex space-x-3  mt-4">
            <button
              type="submit"
              className="w-full bg-black text-white rounded-full px-6 py-2 hover:bg-gray-800"
            >
              {User.id ? "Update" : "Save"}
            </button>
           
          </div>
        </form>
      </section>
    </main>
  );
};

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Layouts } from "../Layouts/Layouts";
import axios from "axios";

export const Home = () => {
  const { User } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalTypes: 0,
    totalOrders: 0,
    totalUsers: 0,
    pendingOrders: 0,
    preparingOrders: 0,
    shippingOrders: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [products, categories, types, orders, users] = await Promise.all([
          axios.get("http://localhost:5000/produk"),
          axios.get("http://localhost:5000/category"),
          axios.get("http://localhost:5000/type"),
          axios.get("http://localhost:5000/Order"),
          axios.get("http://localhost:5000/users"),
        ]);

        const pending = orders.data.filter(
          (o) => o.status === "Pending"
        ).length;
        const preparing = orders.data.filter(
          (o) => o.status === "Dipersiapkan"
        ).length;
        const shipping = orders.data.filter(
          (o) => o.status === "Dalam Pengiriman"
        ).length;

        setStats({
          totalProducts: products.data.length,
          totalCategories: categories.data.length,
          totalTypes: types.data.length,
          totalOrders: orders.data.length,
          totalUsers: users.data.length,
          pendingOrders: pending,
          preparingOrders: preparing,
          shippingOrders: shipping,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layouts>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          {`Dashbord ${User.role}`}
        </h1>

        {/* Ringkasan Utama */}
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          <Card
            title="Total Produk"
            value={stats.totalProducts}
            color="bg-amber-500"
          />
          <Card
            title="Total Kategori"
            value={stats.totalCategories}
            color="bg-indigo-500"
          />
          <Card
            title="Total Tipe Produk"
            value={stats.totalTypes}
            color="bg-green-500"
          />
          <Card
            title="Total User"
            value={stats.totalUsers}
            color="bg-blue-500"
          />
          <Card
            title="Total Order"
            value={stats.totalOrders}
            color="bg-red-500"
          />
        </div>

        {/* Status Pesanan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            title="Pesanan Pending"
            value={stats.pendingOrders}
            color="bg-yellow-500"
          />
          <Card
            title="Sedang Dipersiapkan"
            value={stats.preparingOrders}
            color="bg-purple-500"
          />
          <Card
            title="Dalam Pengiriman"
            value={stats.shippingOrders}
            color="bg-teal-500"
          />
        </div>

      </div>
    </Layouts>
  );
};

  const Card = ({ title, value, color }) => (
    <div
      className={`p-6 rounded-xl shadow-md text-white flex flex-col justify-center items-center ${color} hover:scale-105 transition-transform`}
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );

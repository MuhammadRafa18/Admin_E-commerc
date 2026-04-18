import axios from "axios";
import React, {  useContext, useEffect, useState } from "react";
import { AuthContext } from "../Store/AuthContext";
import axiosInstance from "../services/axiosInstance";

export const UseFecth = (url) => {
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useContext (AuthContext) 
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    const FetchData = async () => {
      if (url) {
        try {
          const res = await axiosInstance.get(url, {
            signal: controller.signal,
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setLoading(false);
          setData(res.data);
        } catch (err) {
          setLoading(false);
          console.error("Requset Data gagal", err.message);
        }
      }
    };
    FetchData();
    return () => {
      controller.abort();
    };
  }, [url]);

  return { Data,setData};
};

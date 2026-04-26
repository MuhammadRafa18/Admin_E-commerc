import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";

export const UseFecth = (url) => {
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    const FetchData = async () => {
      if (!url) return;
      setLoading(true);
      try {
        const res = await axiosInstance.get(url, {
          signal: controller.signal,
        });
        setLoading(false);
        setData(res.data);
      } catch (err) {
        setLoading(false);
        console.error("Requset Data gagal", err.message);
      } finally {
        setLoading(false);
      }
    };
    FetchData();
    return () => {
      controller.abort();
    };
  }, [url, reload]);
  const refetch = () => setReload((prev) => prev + 1);
  return { Data, setData, refetch };
};

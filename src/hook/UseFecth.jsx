import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const UseFecth = (url) => {
   const [Products,setProducts] = useState();
   const [loading,setLoading] = useState(false);
   useEffect(() => {
    const controller = new AbortController();
    setLoading(true)
    const FetchData = async () => {
        try{
            const res = await axios.get(url , {
                signal: controller.signal,
            });
            setLoading(false)
            setProducts(res.data.products)
        } catch (err) {
            setLoading(false)

            console.error("Requset Data gagal", err.message)
        }
    }
    FetchData()
    return () => {
        controller.abort();
    }
   },[url])
  
   return { Products }
}

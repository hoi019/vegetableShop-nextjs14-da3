'use server'
import { revalidateTag } from 'next/cache'

export const handleCreateProductAction = async (data: any) => {
   const res = await fetch("http://localhost:8000/api/product", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
         "Content-Type": "multipart/form-data",
         // 'Content-Type': 'application/x-www-form-urlencoded',
      },
   })
   revalidateTag("list-products")
}

export const handleUpdateProductAction = async (data: any) => {
   const res = await fetch(`http://localhost:8000/api/product/${data.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
      },
   })
   revalidateTag("list-products")
}

export const handleDeleteProductAction = async (data: any) => {
   const res = await fetch(`http://localhost:8000/api/product/${data.id}`, {
      method: "DELETE",
      headers: {
         "Content-Type": "application/json",
         // 'Content-Type': 'application/x-www-form-urlencoded',
      },
   })
   revalidateTag("list-products")
}

export const handleSearchProductAction = async (data: any) => {
   const res = await fetch(`http://localhost:8000/api/product?search=${data.name}`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         // 'Content-Type': 'application/x-www-form-urlencoded',
      },
   })
   const dataProduct = await res.json()
   // if (dataProduct.image) {
   //    dataProduct.imageURL = `http://localhost:8000/${dataProduct.image}`
   // }
   revalidateTag("list-products")
   return dataProduct
}
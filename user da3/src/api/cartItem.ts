'use server'
import { revalidateTag } from 'next/cache'

export const handleDeleteCartItem = async(data: any) => {
   const res = await fetch(`http://localhost:8000/api/cartItem/${data.id}`, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
         "Content-Type": "application/json",
      },
   })
   revalidateTag("list-cartItems")
}

export const handleUpdateCartItem = async(data: any) => {
   const res = await fetch(`http://localhost:8000/api/cartItem/${data.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
         "Content-Type": "application/json",
      },
   })
   revalidateTag("list-cartItems")
}
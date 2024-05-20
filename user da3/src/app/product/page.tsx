'use client'
import Image from "next/image"
import { imgShop } from "../../../public/index"
import { Breadcrumb } from 'antd'
import { Pagination } from 'antd'
import { Deal, Product } from "@/components"
import { IProduct } from "@/components/Popular/popular"
import { formatPrice } from "@/components/Popular/popular"
import { useState, useEffect } from "react"
import Link from 'next/link'


const Shop = () => {
   const [products, setProducts] = useState<any>([])
   const [totalItems, setTotalItems] = useState<number>(0)
   const [page, setPage] = useState<number>(1)

   useEffect(() => {
      const fetchProducts = async () => {
         try {
            const response = await fetch(`http://localhost:8000/api/product?page=${page}&limit=10`)
            if (response.ok) {
               const data = await response.json()
               setProducts(data.data)
               setTotalItems(data.totalItems)                              
            } else {
               console.error('Error fetching')
            }
         } catch (error) {
            console.error('Error fetching:', error)
         }
      }

      fetchProducts()
   }, [page])

   const handleChangePage = (page: number) => {
      setPage(page)
   }

   return (  
      <div className="mx-5 my-[35px]">
         <div className="relative">
            <Image className="rounded-2xl"
               src={imgShop.header}
               width={1590}
               height={220}
               alt="header-bg"
            />
            <div className="absolute top-0 w-full flex justify-between px-20 py-[87px]">
               <div className="flex justify-center items-center">
                  <Breadcrumb className="text-base" separator=">" items={[
                     {
                        title: 'Trang chủ',
                        href: '/',
                     },
                     {
                        title: 'Cửa hàng',
                        href: '/',
                     },
                     {
                        title: 'Sản phẩm',
                        href: '/',
                     },
                  ]} />
               </div>
               <div className="text-[40px] font-semibold">Sản phẩm</div>
            </div>
         </div>
         
         <div className="my-8">
            <div className="grid grid-cols-5 gap-5 mt-5">
               {products.map((product : IProduct) => (
                  <Link href={`/product/${product.id}`} key={product.id}>
                     <Product 
                        name={product.name}
                        image={product.image}
                        category={product.category}
                        manufacture={product.manufacture}
                        price={formatPrice(product.price)}
                     />
                  </Link>
               ))}
            </div>
            <div className="flex justify-center items-center">
               <Pagination
                  showSizeChanger
                  current={page}
                  defaultPageSize={10}
                  total={totalItems}
                  onChange={handleChangePage}
               />
            </div>
         </div>
         <Deal />
      </div>
   )
}
 
export default Shop
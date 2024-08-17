import React, { createContext, useEffect, useState } from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
type Props = {
    children:React.ReactNode
}
export const ProductCT = createContext({} as any)
const ProductContext = ({children}: Props) => {
    const [products,setProduct] = useState<IProduct[]>([])
    const navigate = useNavigate()
    useEffect(()=>{
        (async ()=>{
            try {
                const {data} = await axios.get('http://localhost:3000/products')
                setProduct(data)
            } catch (error) {
                console.log(error);                
            }
            
        })()
    },[])
    const onAdd = async (productDate:FormData)=>{
        try {
            const {data} = await axios.post('http://localhost:3000/products',productDate)
            setProduct([...products,data])
            alert('Thêm mới thành công')
            navigate('/products')
        } catch (error) {
            
        }
    }
    const onUpdate = async (productDate:FormData,id:number|string)=>{
        try {
            const {data} = await axios.put('http://localhost:3000/products/'+id,productDate)
            alert('Cập nhật thành công')
            const newProducts = products.map(product=>(product.id==id)?data:product)
            setProduct(newProducts)
            navigate('/products')
        } catch (error) {
            
        }
    }
    const onDelete = async (id:number|string)=>{
        if (confirm('Bạn chắc chứ')){
            try {
                const {data} = await axios.delete('http://localhost:3000/products/'+id)
                alert('Cập nhật thành công')
                const newProducts = products.filter(product=>product.id!==id)
                setProduct(newProducts)
            } catch (error) {
                
            }
        }
    }
  return (
    <ProductCT.Provider value={{products,onAdd,onDelete,onUpdate}}>{children}</ProductCT.Provider>
  )
}

export default ProductContext

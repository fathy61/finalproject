import React, { useContext, useEffect, useState } from 'react'
import style from './Products.module.css'
import useProducts from '../../Hooks/useProducts'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { CartContext } from '../../../public/Context/CartContext'
import toast from 'react-hot-toast'


export default function Products() {

    const [loading, setloading] = useState(false)
    const [currentId, setcurrentId] = useState(null)

    let {addProductToCart} = useContext(CartContext)
    
    async function addToCart(id){
        setloading(true)
        setcurrentId(id)
        
        let response =  await addProductToCart(id)
        
        if (response.data.status == "success"){
            toast.success(response.data.message)
        }else {
            toast.error(response.data.message)
        }
        setloading(false)
    }

    let {data, isError, error, isLoading, getProducts} = useProducts()

    if(isError){
        return <h3>{error}</h3>
    }

    if(isLoading){
        <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
        </div>
    }


    return (
    <>
        <div className="row pt-5">
            
            {data?.data?.data.map((product)=> (
            
                <div key={product.id} className='col-lg-2  col-md-3'>
                    <div className="prtoduct p-2">
                    <Link to={`/productDetails/${product.id}/${product.category.name}`} className='text-decoration-none'>
                            <img src={product.imageCover} className='w-100 mb-2' alt="" />
                            <h6 className='txet-color m-0'>{product.category.name}</h6>
                            <h6 className='text-black'>{product.title.split(' ').slice(0, 2).join(' ')}</h6>
                            <div className='d-flex justify-content-between  mt-2 text-black'>
                                <span>{product.price} EGP</span>
                                <span><i className="fas fa-star text-warning"></i>{product.ratingsAverage}</span>
                            </div>
                        </Link>
                        <button onClick={() => addToCart(product.id)} 
                            className='btn btn-success my-2'>{loading && currentId === product.id ? 
                            <i className='fas fa-spinner fa-spin'></i> : "Add To Cart"}
                        </button>
                    </div>
                </div>

            ))}
        </div>
    </>
)


}

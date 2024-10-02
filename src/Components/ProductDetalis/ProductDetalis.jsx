import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetalis.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from "react-slick";
import { CartContext } from '../../../public/Context/CartContext';
import toast from 'react-hot-toast';




export default function ProductDetalis() {
    let {addProductToCart} = useContext(CartContext)
    const [product, setproduct] = useState(null)
    const [relatedProducts, setrelatedProducts] = useState([])
    let {id, category} = useParams()
    const [loading, setloading] = useState(false)
    const [currentId, setcurrentId] = useState(null)

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        arrows: false,
    };

    async function addToCart(id){
        setcurrentId(id)
        setloading(true)
        let response =  await addProductToCart(id)
        
        if (response.data.status == "success"){
            toast.success(response.data.message)
        setloading(false)
        }else {
            toast.error(response.data.message)
        setloading(false)
        }
    }
    

    function getProduct(id){
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        .then((res) => {
            setproduct(res.data.data)
        })
        .catch((err) => {
            console.error("Error fetching product details:", err);
        })
    }

    function getAllProducts(){
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
        .then((res) => {
            let related = res.data.data.filter((product) => product.category.name == category)
            setrelatedProducts(related)
        })
        .catch((err) => {
        })
    }

    useEffect(() => {
        getProduct(id)
        getAllProducts()
    }, [id, category] )


    
    return (
    <>
            <div className="row mt-5">
                <div className="col-lg-3 col-md-12"> 
                <Slider {...settings}>  
                    {product?.images.map((src, index) => <img key={index} src={src} className='w-100'></img>)}
                </Slider>
                </div>
                <div className="col-lg-9 col-md-12">
                    <div className="details d-flex justify-content-center flex-column h-100">
                        <h6>{product?.description}</h6>
                        <span className='text-secondary px-3 py-2' style={{fontSize: "14px"}}>{product?.title}</span>
                        <span className='mt-3'>{product?.category.name}</span>
                        <div className='d-flex justify-content-between text-black'>
                                <span>{product?.price} EGP</span>
                                <span><i className="fas fa-star text-warning"></i>{product?.ratingsAverage}</span>
                        </div>
                        
                        <button onClick={() => addToCart(product.id)}
                        className='text-white btn mt-2'>{loading ? <i className='fas fa-spinner fa-spin'></i> : "+ add to cart"}</button>
                    </div>
                </div>
            </div>

            <div className="row pt-5">
            
            { relatedProducts.length > 0 ? relatedProducts.map((product)=> (
            
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
                            <i className='fas fa-spinner fa-spin'></i> : "Add To Cart"}</button>
                    </div>
                </div>

            )): <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
            </div>}
        </div>
    </>
)
}

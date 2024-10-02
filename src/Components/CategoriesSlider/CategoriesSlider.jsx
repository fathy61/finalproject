import React, { useEffect, useState } from 'react';
import style from './CategoriesSlider.module.css';
import axios from 'axios';
import Slider from "react-slick";



export default function CategoriesSlider() {

    const [categories, setcategories] = useState([]); 

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 1000,
    };

    function getCategoriesImages(){
        axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
        .then((res) => {
            setcategories(res.data.data)            
        })
        .catch((err) => {
        })
    }

    useEffect(() => {
        getCategoriesImages()
    }, [] )

    return (

    <>
    <h5 className='m-0 pt-4'>Shop Popular Categories</h5>
        <Slider {...settings}>
            {categories.map((category) => 
            <div key={category._id} className='mt-3'>
            <img src={category.image} className='w-100' style={{height: "200px"}} alt="" />
            <span>{category.name}</span>
            </div>
        )}
        </Slider>
    </>
)
}





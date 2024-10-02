import React, { useEffect, useState } from 'react'
import style from './Brands.module.css'
import axios from 'axios'

export default function Brands() {

const [AllBrands, setAllBrands] = useState([])

    function getAllBrands(){
        axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
        .then((res) => {
            setAllBrands(res.data.data)
        })
        .catch((err) => {

        })
    }


    useEffect(() => {
        getAllBrands()
    }, [])








    return (
    <>
        <div className="row">

            
            {AllBrands.length > 0 ? AllBrands.map((brand)=> 
                
                <div className='col-md-3' key={brand._id}>
                    <div className="category-item border rounded-1 mt-5 ">
                        <img src={brand.image} className='w-100'  alt="brandImg" />
                        <h3 className='text-center p-2 text-success'>{brand.name}</h3>
                    </div>
                </div>
            
            ): <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
            </div> }

        </div>
    </>
)
}

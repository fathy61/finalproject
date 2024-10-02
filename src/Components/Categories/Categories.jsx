import React, { useEffect, useState } from 'react'
import style from './Categories.module.css'
import axios from 'axios'

export default function Categories() {

const [AllCategories, setAllCategories] = useState([])

    function getAllCategories(){
        axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
        .then((res) => {
            setAllCategories(res.data.data)
        })
        .catch((err) => {

        })
    }


    useEffect(() => {
        getAllCategories()
    }, [])








    return (
    <>
        <div className="row">

            {AllCategories.length > 0 ? AllCategories.map((category)=> 
            
            <div className='col-md-3' key={category._id}>
                <div className="category-item border rounded-1 mt-5 ">
                    <img src={category.image} className='w-100 imgCat' alt="categoryImg" />
                    <h3 className='text-center p-2 text-success'>{category.name}</h3>
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

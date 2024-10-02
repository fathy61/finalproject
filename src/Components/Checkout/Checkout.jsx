
import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { UserContext } from '../../../public/Context/UserContext'
import { CartContext } from '../../../public/Context/CartContext'



export default function Checkout() {
    let {checkout} = useContext(CartContext)
    let {cartId} = useContext(CartContext)

    let formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: "",
        },
        onSubmit: ()=> handleCheckout(cartId, `http://localhost:5173`)
    }) 

    async function handleCheckout(cartId, url){
        let {data} = await checkout(cartId, url, formik.values)
        window.location.href = data.session.url
        
    }


    return (
    <>

        <h2 className='text-center pt'>Checkout Now</h2>
        <form onSubmit={formik.handleSubmit} action="">
            <div className="container d-flex flex-column justify-content-center align-items-center">

                <div className="form-floating mb-3 w-50">
                    <input type="text" className="form-control" id="details" onChange={formik.handleChange} onBlur={formik.handleBlur} name='details' value={formik.values.details} placeholder="" />
                    <label className='text-success' htmlFor="floatingInput">details</label>
                </div>

                <div className="form-floating mb-3 w-50">
                    <input type="tel" className="form-control" id="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} name='phone' value={formik.values.phone} placeholder="" />
                    <label className='text-success' htmlFor="floatingInput">phone</label>
                </div>

                <div className="form-floating mb-3 w-50">
                    <input type="text" className="form-control" id="city" onChange={formik.handleChange} onBlur={formik.handleBlur} name='city' value={formik.values.city} placeholder="" />
                    <label className='text-success' htmlFor="floatingInput">Passowrd</label>
                </div>

                <button className='btn btn-success' type='submit'>Checkout</button> 
            </div>
            
        </form>
    </>
)
}


































// import React from 'react'
// import style from './Checkout.module.css'

// export default function Checkout() {
//     return (
//     <>
//         <form className='mt-5'>
//             <div className="mb-3 w-75">
//                 <label for="exampleInputEmail1" className="d-block mb-1">Details</label>
//                 <input type="email" className="form-control" />
//             </div>
//             <div className="mb-3 w-75">
//                 <label for="exampleInputEmail1" className="d-block mb-1">phone</label>
//                 <input type="email" className="form-control" />
//             </div>
//             <div className="mb-3 w-75">
//                 <label for="exampleInputEmail1" className="d-block mb-1">city</label>
//                 <input type="email" className="form-control" />
//             </div>
//         </form>
//     </>
// )
// }

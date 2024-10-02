import React, { useContext, useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import { UserContext } from '../../../public/Context/UserContext'



export default function Register() {
    let {userLogin, setuserLogin} = useContext(UserContext)

    const navigate = useNavigate()
    const [apiError, setapiError] = useState("")
    const [isLoading, setisLoading] = useState(false)

    async function handleRegister(values){
        setisLoading(true)
        await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
        .then((res) => {
            setisLoading(false)
        if(res.data.message == "success"){

            localStorage.setItem("userToken", res.data.token)
            setuserLogin(res.data.token)
            navigate("/")

        }
        })
        .catch((res) => { 
            setisLoading(false)
            setapiError(res.response.data.message);
        })
        
    } 

    let validationSchema = Yup.object().shape({
        name: Yup.string().min(3, "min length is 3")
        .max(10,"max length is 10")
        .required("name is required"),
        email: Yup.string().email("invalid email").required("email is required"),
        phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "invalid phone number").required("phone is erquired"),
        password: Yup.string().matches(/^[A-Z-a-z0-9]{6,10}$/, "password should be between 9 and 10 char").required("password is required"),
        rePassword: Yup.string().oneOf([Yup.ref("password")], "password not match").required("repassword required")
    })

    let formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            rePassword: "",
        },
        validationSchema,
        onSubmit: handleRegister,
    }) 


    return (
    <>

        <h2 className='text-center pt'>Register Now</h2>
        {apiError ? <div className='w-25 mx-auto bg-danger text-light p-3 my-3 rounded-2 fw-bold'>{apiError} </div> : null}

        <form onSubmit={formik.handleSubmit} action="">
            <div className="container d-flex flex-column justify-content-center align-items-center">
                <div className="form-floating mb-3 w-50">
                    <input type="text" className="form-control" id="name" onChange={formik.handleChange} onBlur={formik.handleBlur} name='name' value={formik.values.name} placeholder="" />
                    <label className='text-success' htmlFor="floatingInput">Name</label>
                {formik.errors.name && formik.touched.name? <div className="alert alert text-center text-danger" role="alert">{formik.errors.name}</div>: null}
                </div>

                <div className="form-floating mb-3 w-50">
                    <input type="email" className="form-control" id="email" onChange={formik.handleChange} onBlur={formik.handleBlur} name='email' value={formik.values.email} placeholder="" />
                    <label className='text-success' htmlFor="floatingInput">Email</label>
                {formik.errors.email  && formik.touched.email? <div className="alert alert text-center text-danger" role="alert">{formik.errors.email}</div>: null}
                </div>

                <div className="form-floating mb-3 w-50">
                    <input type="password" className="form-control" id="password" onChange={formik.handleChange} onBlur={formik.handleBlur} name='password' value={formik.values.password} placeholder="" />
                    <label className='text-success' htmlFor="floatingInput">Passowrd</label>
                {formik.errors.password  && formik.touched.password? <div className="alert alert text-center text-danger" role="alert">{formik.errors.password}</div>: null}
                </div>

                <div className="form-floating mb-3 w-50">
                    <input type="password" className="form-control" id="repassowrd" onChange={formik.handleChange} onBlur={formik.handleBlur} name='rePassword' value={formik.values.rePassword} placeholder="" />
                    <label className='text-success'htmlFor="floatingInput">rePassword</label>
                {formik.errors.rePassword  && formik.touched.rePassword? <div className="alert alert text-center text-danger" role="alert">{formik.errors.rePassword}</div>: null}
                </div>

                <div className="form-floating mb-3 w-50">
                    <input type="tel" className="form-control" id="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} name='phone' value={formik.values.phone} placeholder="" />
                    <label className='text-success'htmlFor="floatingInput">Phone</label>
                {formik.errors.phone  && formik.touched.phone? <div className="alert alert text-center text-danger" role="alert">{formik.errors.phone}</div>: null}
                </div>
                <button className='btn btn-success' type='submit'>{isLoading ? <i className='fas fa-spinner fa-spin'></i> : "Register"}</button> 
                <Link to="/login"><span className='mt-2 d-block'>Already have an account? Login Now</span></Link>
            </div>
            
        </form>
    </>
)
}

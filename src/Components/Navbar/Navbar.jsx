import React, { useCallback, useContext } from 'react'
import style from './Navbar.module.css'
import logo from '../../assets/freshcart-logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../../public/Context/UserContext'

export default function Navbar() {
    let navigate = useNavigate()
    let {userLogin, setuserLogin} = useContext(UserContext)
    
    function signout(){
        localStorage.removeItem("userToken")
        setuserLogin(null)
        navigate("/login")
    }

    return (
    <>

<header className='pb-5'>
    <nav className="navbar navbar-expand-lg bg-body-tertiary position-fixed w-100 z-3 position-relative">
        <div className="container"> 
        <Link to=""><img src={logo} alt="logo" /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>   
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {userLogin !== null ? <>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-3">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="cart">Cart</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="wishlist">Wish List</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="products">Products</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="categories">Categories</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="brands">Brands</Link>
                    </li>
                </ul>
                </> : null}
                
                <div className='icons mt-1 position-absolute d-flex align-items-center'>
                <i className="fab fa-instagram cursor"></i>
                <i className="fab fa-facebook cursor ms-3"></i>
                <i className="fab fa-tiktok cursor ms-3"></i>
                <i className="fab fa-twitter cursor ms-3"></i>
                <i className="fab fa-linkedin cursor ms-3"></i>
                <i className="fab fa-youtube cursor ms-3"></i>

                {userLogin != null ? <span onClick={signout} className='ms-5 mt-1 cursor'>SignOut</span> : <>
                    <ul className="navbar-nav  mb-2 mb-lg-1 ms-3">
                    <li className="nav-item">
                        <Link to="login" className='text-decoration-none text-black'>Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="register" className='mx-2 text-decoration-none text-black'>Register</Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link className='text-decoration-none text-black'>SignOut</Link>
                    </li> */}
                    
                </ul></> }
                </div>
            </div>
        </div>
    </nav>
</header>

    </>
)

}
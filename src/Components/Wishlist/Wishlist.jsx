import React, { useContext, useEffect, useState } from 'react'
import style from './Wishlist.module.css'
import { WishContext } from '../../../public/Context/WishContext'
import { CartContext } from '../../../public/Context/CartContext'
import toast from 'react-hot-toast'

export default function Wishlist() {
    const [getWishList, setgetWishList] = useState([]);
    const [WishDetails, setWishDetails] = useState(null);
    const [loading, setloading] = useState(false);
    const [loadingAdd, setloadingAdd] = useState(false);
    const [loadingDelete, setloadingDelete] = useState(false);
    const [currentId, setcurrentId] = useState(null);

    let {getLoggedUserWishlist, deleteItemFromWishlist} = useContext(WishContext)
    let {addProductToCart} = useContext(CartContext)

    // Load wishlist from localStorage on mount
    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setgetWishList(storedWishlist);
    }, []);

    async function getWishlist() {
        setloading(true);
        let respone = await getLoggedUserWishlist();
        if (respone.data.status === "success") {
            setWishDetails(respone.data.data);
            // Save wishlist in localStorage
            localStorage.setItem('wishlist', JSON.stringify(respone.data.data));
        }
        setloading(false);
    }

    async function deleteItem(id) {
        setloadingDelete(true);
        setcurrentId(id);
        let response = await deleteItemFromWishlist(id);
        if (response.data.status === "success") {
            setWishDetails(response.data.data);
            getWishlist();
            // Update wishlist in localStorage
            localStorage.setItem('wishlist', JSON.stringify(response.data.data));
        } else {
            toast.error("Error");
        }
        setloadingDelete(false);
    }

    async function addToCart(id) {
        setloadingAdd(true);
        setcurrentId(id);
        let response = await addProductToCart(id);
        if (response.data.status === "success") {
            toast.success(response.data.message);
            deleteItem(id)
        } else {
            toast.error(response.data.message);
        }
        setloadingAdd(false);
    }

    useEffect(() => {
        getWishlist();
    }, []);

    return (
        <>
          {loading ? (
            <div className="spinner">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>
          ) : WishDetails?.length > 0 ? (

            <div className="Cart bg-body-tertiary p-5 mt-5 rounded-3 position-relative">
              <header className="ms-4">
                <h2 style={{ fontWeight: "400" }} className="d-block">
                    My wish List
                </h2>
              </header>
    
              {WishDetails?.map((product) => (
                <div key={product.id} className="container">
                  <div className="row p-3 border-bottom">
                    <div className="col-lg-2 col-md-12">
                      <img
                        src={product.imageCover}
                        className="w-100"
                        alt=""
                      />
                    </div>
                    <div className="col-lg-10 col-md-12 d-flex justify-content-between align-items-center">
                      <div className="d-flex flex-column">
                        <span style={{ fontSize: "20px" }}>
                          {product.title}
                        </span>
                        <span style={{ color: "#22db14", fontSize: "17px" }}>
                          price : {product.price}
                        </span>

                        <button
                          className="btn btn-sm m-0 p-0 text-danger text-start border-0"
                          onClick={() => deleteItem(product.id)}
                        >
                          <i className="fa fa-trash me-1 mt-2"></i>
                          {loadingDelete && currentId === product.id ? (
                            <i className="fas fa-spinner fa-spin"></i>
                          ) : (
                            "Remove"
                          )}
                        </button>
                      </div>
                      <button onClick={() => addToCart(product.id)} 
                            className='btn btn-outline-success clearBtn'>{loadingAdd && currentId === product.id ? 
                            <i className='fas fa-spinner fa-spin'></i> : "Add To Cart"}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-5 bg-body-tertiary my-5">
              <h2>My Wish List</h2>
            </div>
          )}
        </>
      );
}

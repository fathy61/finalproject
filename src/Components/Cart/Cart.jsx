import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { CartContext } from "../../../public/Context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  let {
    getLoggedUserCart,
    updateCartProductQuantity,
    deleteItemFromCart,
    clearUserCart,
  } = useContext(CartContext);
  const [CartDetails, setCartDetails] = useState(null);
  const [nunberOfItem, setnunberOfItem] = useState(null);
  const [loading, setloading] = useState(false);
  const [loadingUpdate, setloadingUpdate] = useState(false);
  const [loadingDelete, setloadingDelete] = useState(false);
  const [currentId, setcurrentId] = useState(null);

  async function getCartItems() {
    setloading(true);
    try {
      let response = await getLoggedUserCart();
      if (response.data.status === "success") {
        setCartDetails(response.data.data);
        setnunberOfItem(response.data.numOfCartItems);
      }
    } finally {
      setloading(false);
    }
  }

  async function updateProduct(id, count) {
    setloadingUpdate(true);
    setcurrentId(id);
    if (count == 0) {
      deleteItem(id);
    } else {
      let response = await updateCartProductQuantity(id, count);
      if (response.data.status == "success") {
        toast.success("Product updated successfully");
        setCartDetails(response.data.data);
      } else {
        toast.error("Error");
      }
    }
    setloadingUpdate(false);
  }

  async function deleteItem(id) {
    setloadingDelete(true);
    setcurrentId(id);
    let response = await deleteItemFromCart(id);
    if (response.data.status == "success") {
      setCartDetails(response.data.data);
      setnunberOfItem(response.data.numOfCartItems);
    } else {
      toast.error("Error");
    }
    setloadingDelete(false);
  }

  async function clearCart() {
    setloading(true);
    let response = await clearUserCart();
    if (response.data.message == "success") {
      setCartDetails(response.data.data);
      setloading(false);
    } else {
      toast.error("Error");
    }
  }

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      {loading ? (
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      ) : CartDetails?.products.length > 0 ? (
        <div className="Cart bg-body-tertiary p-5 mt-5 rounded-3 position-relative">
          <header className="ms-4">
            <h2 style={{ fontWeight: "400" }} className="d-block">
              Shop Cart
            </h2>
            <h5 style={{ fontWeight: "400", color: "#22db14" }}>
              Total Cart Price : {CartDetails?.totalCartPrice}{" "}
            </h5>

            <Link to={`/checkout`}>
              <button
                type="button"
                className="btn btn-successa position-absolute pos"
              >
                Cheak Out
              </button>
            </Link>

            {/* <h5 style={{fontWeight: "400", color: "#22db14"}}>Number Of Item : {nunberOfItem} </h5> */}
          </header>

          {CartDetails?.products.map((product) => (
            <div key={product.product.id} className="container">
              <div className="row p-3 border-bottom">
                <div className="col-lg-2 col-md-12">
                  <img
                    src={product.product.imageCover}
                    className="w-100"
                    alt=""
                  />
                </div>
                <div className="col-lg-10 col-md-12 d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-column">
                    <span style={{ fontSize: "20px" }}>
                      {product.product.title}
                    </span>
                    <span style={{ color: "#22db14", fontSize: "17px" }}>
                      price : {product.price}
                    </span>
                    <button
                      className="btn btn-sm m-0 p-0 text-danger text-start border-0"
                      onClick={() => deleteItem(product.product.id)}
                    >
                      <i className="fa fa-trash me-1 mt-2"></i>
                      {loadingDelete &&
                      currentId == product.product.id &&
                      !loadingUpdate ? (
                        <i className="fas fa-spinner fa-spin"></i>
                      ) : (
                        "Remove"
                      )}
                    </button>
                  </div>
                  <div className="updateBtn">
                    <button
                      onClick={() =>
                        updateProduct(product.product.id, product.count + 1)
                      }
                    >
                      +
                    </button>
                    <span className="mx-2">
                      {" "}
                      {loadingUpdate && currentId == product.product.id ? (
                        <i className="fas fa-spinner fa-spin"></i>
                      ) : (
                        product.count
                      )}
                    </span>
                    <button
                      onClick={() =>
                        updateProduct(product.product.id, product.count - 1)
                      }
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="text-center mt-4">
            <button
              onClick={() => clearCart()}
              type="button"
              className="btn btn-outline-success clearBtn"
            >
              Clear Your Cart
            </button>
          </div>
        </div>
      ) : (
        <div className="p-5 bg-body-tertiary my-5">
          <h2>Cart Shop</h2>
          <h2 className="mt-4">your cart is empty</h2>
        </div>
      )}
    </>
  );
}

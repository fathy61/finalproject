import axios from "axios";
import { createContext, useEffect, useState,} from "react";


export let CartContext = createContext()

export default function CartContextProvider(props){
    const [cartId, setcartId] = useState(0)
    
    let headers = {
        token: localStorage.getItem("userToken"),
    };

    function addProductToCart(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, 
            {
                productId: productId,
            }, 
            {
                headers: headers,
            }
        )
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        });
    }

    function getLoggedUserCart(productId) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {headers}
        )
        .then((res) => {
            setcartId(res.data.data._id)
            return res
        })
        .catch((err) => {
            return err
        });
    }

    function updateCartProductQuantity(productId, newCount) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {count: newCount},{headers}
        )
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        });
    }

    function deleteItemFromCart(productId, newCount) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers}
        )
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        });
    }

    function clearUserCart() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers}
        )
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        });
    }

    function checkout(cartId, url, formData){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
            {
                shippingAddress : formData
            },
            {
                headers,
            }
        )
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        });
    }

    useEffect(()=> {
        getLoggedUserCart()
    },[])

    return (
        <CartContext.Provider 
        value={{ 
        addProductToCart, 
        getLoggedUserCart, 
        updateCartProductQuantity, 
        deleteItemFromCart, 
        clearUserCart,
        checkout, 
        cartId,
        }}>
            {props.children}
        </CartContext.Provider>
    );
}
import axios from "axios";
import { createContext } from "react";


export let  WishContext = createContext()

export default function WishContextProvider(props){

    let headers = {
        token: localStorage.getItem("userToken"),
    };


    function addProductToWishList(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, 
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

    function getLoggedUserWishlist(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {headers})
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        });
    }

    function deleteItemFromWishlist(itemId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${itemId}`, {headers})
        .then((res) => {
            return res
        })
        .catch((err) => {
            return err
        });
    }




    return (
        <WishContext.Provider 
        value={{ 
            addProductToWishList,
            getLoggedUserWishlist,
            deleteItemFromWishlist,
        }}>
            {props.children}
        </WishContext.Provider>
    );


}

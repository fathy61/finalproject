import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Products from './Components/Products/Products';
import Categories from './Components/Categories/Categories';
import Cart from './Components/Cart/Cart';
import Wishlist from './Components/Wishlist/Wishlist';
import Brands from './Components/Brands/Brands';
import Allorders from './Components/Allorders/Allorders';
import Register from './Components/Register/Register';
import Notfound from './Components/Notfound/Notfound';
import Login from './Components/Login/Login';
import Checkout from './Components/Checkout/Checkout';
import UserContextProvider from '../public/Context/UserContext';
import ProtectedRoute from './Components/ProtectedRout/ProtectedRoute';
import ProductDetails from './Components/ProductDetalis/ProductDetalis';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CartContextProvider from '../public/Context/CartContext';
import { Toaster } from 'react-hot-toast';
import WishContextProvider from '../public/Context/WishContext';


let query = new QueryClient();

let rout = createHashRouter([
  {path: "", element: <Layout /> , children: [
    {index: true, element: <ProtectedRoute> <Home /> </ProtectedRoute>} ,
    {path: "cart", element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
    {path: "products", element: <ProtectedRoute> <Products /> </ProtectedRoute> },
    {path: "categories", element: <ProtectedRoute> <Categories /> </ProtectedRoute> },
    {path: "brands", element: <ProtectedRoute> <Brands /> </ProtectedRoute> },
    {path: "productDetails/:id/:category", element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute> },
    {path: "register", element: <Register />},
    {path: "allorders", element: <Allorders />},
    {path: "checkout", element: <Checkout />},
    {path: "wishlist", element: <Wishlist />},
    {path: "login", element: <Login />},
    {path: "notfound", element: <Notfound />},
  ]}
]);

function App() {

  return (
    <>
      <UserContextProvider>
        <QueryClientProvider client={query}>
          <WishContextProvider>
            <CartContextProvider>
              <RouterProvider router={rout}></RouterProvider>
              <Toaster />
            </CartContextProvider>
          </WishContextProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </UserContextProvider>
    </>
  );
}

export default App;

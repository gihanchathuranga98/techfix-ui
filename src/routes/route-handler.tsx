import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthHanler from './auth-handler';
import Login from '../pages/login';
import CreateUser from '../pages/admin/create-user';
import Products from '../pages/admin/products';
import CreateProducts from '../pages/admin/create-product';
import AdminQuotes from '../pages/admin/quotes';
import SupplierQuotes from '../pages/supplier/quotes';
import CreateQuote from '../pages/supplier/create-quote';

const RouteHandler = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthHanler />}>
                    <Route path='/admin-create-user' element={<CreateUser />} />
                    <Route path='/admin-products' element={<Products />} />
                    <Route path='/admin-create-product' element={<CreateProducts />} />
                    <Route path='/admin-quotes' element={<AdminQuotes />} />
                    <Route path='/supplier-create-quote' element={<CreateQuote />} />
                    <Route path='/supplier-quotes' element={<SupplierQuotes />} />
                </Route>
                <Route path='/' element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouteHandler;
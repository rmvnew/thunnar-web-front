
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, RouterProvider } from 'react-router-dom'
import DashBoard from '../pages/DashBoard';
import User from '../pages/user/User';
import Product from '../pages/product/Product';
import Sidebar from '../components/Sidebar';
import UserForm from '../pages/user/UserForm';
import { RequireAuth } from '../contexts/auth/RequireAuth';
import Login from '../pages/login/Login';
import ProductForm from '../pages/product/ProductForm';


const RouterElements = () => {

    return (
        <>
            <Router>
                {/* <Sidebar> */}
                    <Routes>
                        <Route path='/login' element={<Login />} />
                        <Route path='/' element={<Sidebar><RequireAuth><DashBoard /></RequireAuth></Sidebar>} />
                        <Route path='/user' element={<Sidebar><RequireAuth><User /></RequireAuth></Sidebar>} />
                        <Route path='/user/form' element={<Sidebar><RequireAuth><UserForm /></RequireAuth></Sidebar>} />
                        <Route path='/product' element={<Sidebar><RequireAuth><Product /></RequireAuth></Sidebar>} />
                        <Route path='/product/form' element={<Sidebar><RequireAuth><ProductForm /></RequireAuth></Sidebar>} />
                    </Routes>
                {/* </Sidebar> */}
            </Router>
        </>
    )
}

export default RouterElements

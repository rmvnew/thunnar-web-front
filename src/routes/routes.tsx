
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

import { motion, MotionConfig } from 'framer-motion';
import Footer from '../components/Footer';


const RouterElements = () => {

    return (
        <>
            <Router>
                {/* <Sidebar> */}
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/' element={
                        <Sidebar>
                            <Footer>
                                <RequireAuth>
                                    <DashBoard />
                                </RequireAuth>
                            </Footer>
                        </Sidebar>
                    } />
                    <Route path='/user' element={
                        <Sidebar>
                            <Footer>
                                <RequireAuth>
                                    <User />
                                </RequireAuth>
                            </Footer>
                        </Sidebar>
                    } />
                    <Route path='/user/form' element={
                        <Sidebar>
                            <Footer>
                                <RequireAuth>
                                    <UserForm />
                                </RequireAuth>
                            </Footer>
                        </Sidebar>
                    } />
                    <Route path='/product' element={
                        <Sidebar>
                            <Footer>
                                <RequireAuth>
                                    <Product />
                                </RequireAuth>
                            </Footer>
                        </Sidebar>
                    } />
                    <Route path='/product/form' element={
                        <Sidebar>
                            <Footer>
                                <RequireAuth>
                                    <ProductForm />
                                </RequireAuth>
                            </Footer>
                        </Sidebar>
                    } />
                </Routes>
                {/* </Sidebar> */}
            </Router>
        </>
    )
}

export default RouterElements

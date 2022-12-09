
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
import { WorkOrder } from '../pages/work-order/Work-order';


const RouterElements = () => {

    return (
        <>
            <Router>
                {/* <Sidebar> */}
                <Routes>

                    <Route path='/login' element={<Login />} />

                    <Route path='/' element={
                        <Footer>
                            <Sidebar>
                                <RequireAuth>
                                    <DashBoard />
                                </RequireAuth>
                            </Sidebar>
                        </Footer>
                    } />

                    <Route path='/user' element={
                        <Footer>
                            <Sidebar>
                                <RequireAuth>
                                    <User />
                                </RequireAuth>
                            </Sidebar>
                        </Footer>
                    } />

                    <Route path='/user/form' element={
                        <Footer>
                            <Sidebar>
                                <RequireAuth>
                                    <UserForm />
                                </RequireAuth>
                            </Sidebar>
                        </Footer>
                    } />

                    <Route path='/product' element={
                        <Footer>
                            <Sidebar>
                                <RequireAuth>
                                    <Product />
                                </RequireAuth>
                            </Sidebar>
                        </Footer>
                    } />

                    <Route path='/product/form' element={
                        <Footer>
                            <Sidebar>
                                <RequireAuth>
                                    <ProductForm />
                                </RequireAuth>
                            </Sidebar>
                        </Footer>
                    } />

                    <Route path='/work-order' element={
                        <Footer>
                            <Sidebar>
                                <RequireAuth>
                                    <WorkOrder />
                                </RequireAuth>
                            </Sidebar>
                        </Footer>
                    } />
                </Routes>
                {/* </Sidebar> */}
            </Router>
        </>
    )
}

export default RouterElements

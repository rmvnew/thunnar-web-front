

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DashBoard from '../pages/DashBoard';
import User from '../pages/user/User';
import Product from '../pages/product/Product';
import Sidebar from '../components/sidebar/Sidebar';
import UserForm from '../pages/user/UserForm';
import { RequireAuth } from '../contexts/auth/RequireAuth';
import Login from '../pages/login/Login';
import ProductForm from '../pages/product/ProductForm';
import Footer from '../components/footer/Footer';
import { WorkOrder } from '../pages/work-order/Work-order';
import { WorkOrderForm } from '../pages/work-order/WorkOrderForm';


const RouterElements = () => {

    return (
        <>
            <Router>
                {/* <Sidebar> */}
                <Routes>

                    <Route path='/login' element={<Login />} />

                    <Route path='/' element={
                        <RequireAuth>
                            <Footer>
                                <Sidebar>
                                    <DashBoard />
                                </Sidebar>
                            </Footer>
                        </RequireAuth>
                    } />

                    <Route path='/user' element={
                        <RequireAuth>
                            <Footer>
                                <Sidebar>
                                    <User />
                                </Sidebar>
                            </Footer>
                        </RequireAuth>
                    } />

                    <Route path='/user/form' element={
                        <RequireAuth>
                            <Footer>
                                <Sidebar>
                                    <UserForm />
                                </Sidebar>
                            </Footer>
                        </RequireAuth>
                    } />

                    <Route path='/product' element={
                        <RequireAuth>
                            <Footer>
                                <Sidebar>
                                    <Product />
                                </Sidebar>
                            </Footer>
                        </RequireAuth>
                    } />

                    <Route path='/product/form' element={
                        <RequireAuth>
                            <Footer>
                                <Sidebar>
                                    <ProductForm />
                                </Sidebar>
                            </Footer>
                        </RequireAuth>
                    } />

                    <Route path='/work-order' element={
                        <RequireAuth>
                            <Footer>
                                <Sidebar>
                                    <WorkOrder />
                                </Sidebar>
                            </Footer>
                        </RequireAuth>
                    } />
                    
                    <Route path='/work-order/form' element={
                        <RequireAuth>
                            <Footer>
                                <Sidebar>
                                    <WorkOrderForm />
                                </Sidebar>
                            </Footer>
                        </RequireAuth>
                    } />
                </Routes>
                {/* </Sidebar> */}
            </Router>
        </>
    )
}

export default RouterElements

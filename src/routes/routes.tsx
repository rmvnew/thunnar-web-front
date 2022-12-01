
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, RouterProvider } from 'react-router-dom'
import DashBoard from '../pages/DashBoard';
import User from '../pages/User';
import Product from '../pages/Product';
import Sidebar from '../components/Sidebar';
import UserForm from '../pages/UserForm';
import { RequireAuth } from '../contexts/auth/RequireAuth';


const RouterElements = () => {

    return (
        <>
            <Router>
                <Sidebar>
                    <Routes>
                        <Route path='/home' element={<RequireAuth><DashBoard /></RequireAuth>} />
                        <Route path='/user' element={<User />} />
                        <Route path='/user/form' element={<UserForm />} />
                        <Route path='/product' element={<Product />} />
                    </Routes>
                </Sidebar>
            </Router>
        </>
    )
}

export default RouterElements

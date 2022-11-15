
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, RouterProvider } from 'react-router-dom'
import DashBoard from '../pages/DashBoard';
import User from '../pages/User';
import Product from '../pages/Product';
import Sidebar from '../components/Sidebar';


const RouterElements = () => {

    return (
        <>
            <Router>
                <Sidebar>
                    <Routes>
                        <Route path='/' element={<DashBoard />} />
                        <Route path='/user' element={<User />} />
                        <Route path='/product' element={<Product />} />
                    </Routes>
                </Sidebar>
            </Router>
        </>
    )
}

export default RouterElements

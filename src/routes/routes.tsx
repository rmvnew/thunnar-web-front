
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, RouterProvider } from 'react-router-dom'
import DashBoard from '../pages/DashBoard';
import User from '../pages/User';
import Product from '../pages/Product';
import Sidebar from '../components/Sidebar';
import UserForm from '../pages/UserForm';
import { RequireAuth } from '../contexts/auth/RequireAuth';
import Login from '../pages/login/Login';


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
                    </Routes>
                {/* </Sidebar> */}
            </Router>
        </>
    )
}

export default RouterElements

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AuthLayout = () => {
    return (
        <div className='font-poppins bg-gray-100'>
            <header className='py-3 w-11/12 mx-auto'>
                <Navbar></Navbar>
            </header>
            Auth Layout
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;
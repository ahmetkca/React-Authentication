import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export const Layout = () => {

    return (
        <main>
            <Navbar />
            <hr />
            <Outlet />
        </main>
    )
}

export default Layout;
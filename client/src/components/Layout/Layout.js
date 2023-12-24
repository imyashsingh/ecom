import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
    return (
        <>
            <Header />
            <Toaster
                toastOptions={{
                    className: "",
                    style: {
                        border: "1px solid #713200",
                        padding: "16px",
                        color: "#713200",
                    },
                }}
            />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;

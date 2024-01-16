import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import Private from "./components/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./components/Routes/AdminRoute";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProducts from "./pages/admin/CreateProducts";
import Users from "./pages/admin/Users";
import Profile from "./pages/user/Profile";
import Ordres from "./pages/user/Ordres";
import Products from "./pages/admin/Products";
import UpdateProduct from "./pages/admin/UpdateProduct";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/dashboard" element={<Private />}>
                        <Route path="user" element={<Dashboard />} />
                        <Route path="user/profile" element={<Profile />} />
                        <Route path="user/ordres" element={<Ordres />} />
                    </Route>
                    <Route path="/dashboard" element={<AdminRoute />}>
                        <Route path="admin" element={<AdminDashboard />} />
                        <Route
                            path="admin/create-category"
                            element={<CreateCategory />}
                        />
                        <Route
                            path="admin/create-product"
                            element={<CreateProducts />}
                        />
                        <Route
                            path="admin/products/:slug"
                            element={<UpdateProduct />}
                        />
                        <Route path="admin/products" element={<Products />} />
                        <Route path="admin/users" element={<Users />} />
                    </Route>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/policy" element={<Policy />} />
                    <Route path="/*" element={<PageNotFound />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;

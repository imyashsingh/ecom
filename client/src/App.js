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
import Profile from "./pages/user/Profile";
import Products from "./pages/admin/Products";
import UpdateProduct from "./pages/admin/UpdateProduct";
import Search from "./pages/user/Search";
import ProductDetails from "./pages/ProductDetails";
import CategoryProduct from "./pages/CategoryProduct";
import Categories from "./pages/Categories";
import CartPage from "./pages/CartPage";
import Orders from "./pages/user/Orders";
import AdminOrders from "./pages/admin/AdminOrders";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/dashboard" element={<Private />}>
                        <Route path="user" element={<Dashboard />} />
                        <Route path="user/profile" element={<Profile />} />
                        <Route path="user/orders" element={<Orders />} />
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
                            path="admin/products/:pid"
                            element={<UpdateProduct />}
                        />
                        <Route path="admin/products" element={<Products />} />

                        <Route path="admin/orders" element={<AdminOrders />} />
                    </Route>
                    <Route path="/categories" element={<Categories />} />
                    <Route
                        path="/category/:slug"
                        element={<CategoryProduct />}
                    />
                    <Route path="/search" element={<Search />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/product/:pid" element={<ProductDetails />} />
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

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

const HomePage = () => {
    const [products, setProdcts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [cart, setCart] = useCart();

    const navigate = useNavigate();

    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/category/get-category`
            );
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
            );
            setLoading(false);
            if (data?.success) {
                setProdcts([...products, ...data.products]);
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const filterProduct = async () => {
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
                { checked, radio }
            );
            if (data?.success) {
                setProdcts(data.products);
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
        }
    };
    // get total count of Product
    const getTotal = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/product-count`
            );
            if (data?.success) {
                setTotal(data.total);
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTotal();
        getAllCategory();
        if (checked.length === 0 && radio.length === 0) getAllProducts();
        // eslint-disable-next-line
    }, [checked.length, radio.length, page]);

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
        // eslint-disable-next-line
    }, [checked, radio]);

    const handleFilter = (id) => {
        if (checked.includes(id)) {
            let all = checked.filter((e) => e !== id);
            setChecked(all);
        } else {
            setChecked([...checked, id]);
        }
    };

    return (
        <>
            <div className="row">
                <div className="col-md-2 mt-4">
                    <h3 className="text-center">Filter By Category</h3>
                    <div className="d-flex flex-column m-3">
                        {categories?.map((c) => (
                            <div className="form-check" key={c._id}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={c.name}
                                    onChange={() => handleFilter(c._id)}
                                />
                                <label className="form-check-label">
                                    {c.name}
                                </label>
                            </div>
                        ))}
                    </div>
                    {/*Price Filter*/}
                    <h3 className="text-center">Filter By Price</h3>
                    <div className="d-flex flex-column m-3">
                        {Prices?.map((c) => (
                            <div className="form-check" key={c._id}>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="flexRadioDefault"
                                    onChange={() => setRadio(c.array)}
                                />
                                <label className="form-check-label">
                                    {c.name}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="d-flex flex-column m-3">
                        <button
                            className="btn btn-danger"
                            onClick={() => window.location.reload()}
                        >
                            Reset Filter
                        </button>
                    </div>
                </div>
                <div className="col-md-10">
                    <h1 className="text-center mt-3">All Products</h1>
                    <div className="d-flex flex-wrap">
                        {products?.map((p) => (
                            <div
                                className="card m-2"
                                style={{ width: "18rem" }}
                                key={p._id}
                            >
                                <img
                                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <strong className="card-title">
                                        {p.name}
                                    </strong>

                                    <p className="card-text">
                                        {p.description.substr(0, 25)}...
                                    </p>
                                    <p>
                                        <strong className="card-text">
                                            ${p.price}
                                        </strong>
                                    </p>
                                    <button
                                        className="btn btn-outline-secondary"
                                        onClick={() => {
                                            navigate(`/product/${p._id}`);
                                        }}
                                    >
                                        More Details
                                    </button>
                                    <button
                                        className="btn btn-dark ms-1"
                                        onClick={() => {
                                            setCart([...cart, p]);
                                            localStorage.setItem(
                                                "cart",
                                                JSON.stringify([...cart, p])
                                            );
                                            toast.success("Item Added to cart");
                                        }}
                                    >
                                        ADD TO CART
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center p-3">
                        {checked.length === 0 &&
                            radio.length === 0 &&
                            products &&
                            products.length < total && (
                                <button
                                    className="btn btn-warning"
                                    onClick={() => setPage(page + 1)}
                                >
                                    {loading ? "Loading" : "Load More"}
                                </button>
                            )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;

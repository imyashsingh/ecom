import React from "react";
import { useSearch } from "../../context/search";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";

const Search = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    return (
        <div className="container">
            <div className="text-center">
                <h1>Search Result</h1>
                <h6>
                    {values?.results.length < 1
                        ? "No Product Found"
                        : `Found ${values?.results.length} Results`}
                </h6>
                <div className="d-flex flex-wrap m-4">
                    {values?.results?.map((p) => (
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
                                <strong className="card-title">{p.name}</strong>

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
                                    className="btn btn-outline-secondary ms-1"
                                    onClick={() => {
                                        setCart([...cart, p]);
                                        localStorage.setItem(
                                            "cart",
                                            JSON.stringify([...cart, p])
                                        );
                                        toast.success("Item Added to cart");
                                    }}
                                >
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Search;

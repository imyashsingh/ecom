import React from "react";
import { useSearch } from "../../context/search";
import { Link } from "react-router-dom";

const Search = () => {
    const [values, setValues] = useSearch();
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
                        <Link
                            to={`${p.slug}`}
                            key={p._id}
                            className="product-link"
                        >
                            <div
                                className="card m-2"
                                style={{ width: "18rem" }}
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
                                    <button className="btn btn-outline-secondary">
                                        More Details
                                    </button>
                                    <button className="btn btn-outline-secondary ms-1">
                                        Add To Cart
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Search;

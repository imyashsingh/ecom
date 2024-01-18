import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
    const [products, setProdcts] = useState([]);

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/get-product`
            );
            if (data?.success) {
                setProdcts(data.products);
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
        }
    };
    useEffect(() => getAllProducts, []);

    return (
        <>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 text-center">
                        <h3>All Products </h3>
                        <div className="d-flex flex-wrap">
                            {products.map((p) => (
                                <Link to={`${p._id}`} key={p._id}>
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
                                            <p className="card-title">
                                                {p.name}
                                            </p>
                                            <p className="card-text">
                                                {p.description}
                                            </p>
                                            <p>
                                                <strong className="card-text">
                                                    ${p.price}
                                                </strong>
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Products;

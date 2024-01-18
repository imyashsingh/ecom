import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
    const navigate = useNavigate();

    const { pid } = useParams();

    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [id, setId] = useState("");
    const [photo, setPhoto] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState(false);

    //get Single Product

    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/product/get-product/${pid}`
            );
            if (data?.success) {
                setId(data.product?._id);
                setCategory(data.product?.category?.name);
                setName(data.product?.name);
                setDescription(data.product?.description);
                setPrice(data.product?.price);
                setQuantity(data.product?.quantity);
                setShipping(data.product?.shipping);
            }
        } catch (error) {
            console.log(error);
            toast.error("Somthing Went Wrong In Getting Category");
        }
    };

    //get all categories
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
            toast.error("Somthing Went Wrong In Getting Category");
        }
    };

    useEffect(() => {
        getAllCategory();
        getSingleProduct();
        // eslint-disable-next-line
    }, []);

    // create product
    const handleUpdate = async () => {
        try {
            const categoryID = categories.find(
                (ele) => ele.name.toLowerCase() === category.toLowerCase()
            );
            const productData = new FormData();
            productData.append("name", name);
            productData.append("category", categoryID._id);
            photo && productData.append("photo", photo);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("shipping", shipping);
            const { data } = await axios.put(
                `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
                productData
            );
            if (data?.success) {
                toast.success(data?.message);
                navigate("/dashboard/admin/products");
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
        }
    };

    // Delete Product

    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(
                `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
            );
            if (data?.success) {
                toast.success(data?.message);
                navigate("/dashboard/admin/products");
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
        }
    };
    return (
        <>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 text-center">
                        <h3>Update Products</h3>
                        <div className="m-1 mt-3 ">
                            <div className="dropdown">
                                <input
                                    type="text"
                                    className="form-control p-2"
                                    data-bs-toggle="dropdown"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-default"
                                    placeholder="Search Category Here"
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                />
                                <ul className="dropdown-menu w-100">
                                    {categories
                                        ?.filter((ele) =>
                                            ele.name
                                                .toLowerCase()
                                                .includes(
                                                    category.toLowerCase()
                                                )
                                        )
                                        ?.map((ele) => (
                                            <li
                                                key={ele._id}
                                                className="dropdown-item cursorpoint"
                                                onClick={() =>
                                                    setCategory(ele.name)
                                                }
                                            >
                                                {ele.name}
                                            </li>
                                        ))
                                        .slice(0, 10)}
                                </ul>
                            </div>
                            <div className="mt-3">
                                <label className="btn btn-outline-secondary col-md-8">
                                    {photo ? photo.name : "Upload Photo"}
                                    <input
                                        type="file"
                                        name="photo"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setPhoto(e.target.files[0])
                                        }
                                        hidden
                                    ></input>
                                </label>
                            </div>
                            <div className="mb-3">
                                {photo ? (
                                    <div className="text-center">
                                        <img
                                            src={URL.createObjectURL(photo)}
                                            alt="product_photo"
                                            height={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <img
                                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                                            alt="product_photo"
                                            height={"200px"}
                                            className="img img-responsive"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="write a name"
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    type="text"
                                    value={description}
                                    placeholder="write a description"
                                    className="form-control"
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </div>

                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={price}
                                    placeholder="write a Price"
                                    className="form-control"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={quantity}
                                    placeholder="write a quantity"
                                    className="form-control"
                                    onChange={(e) =>
                                        setQuantity(e.target.value)
                                    }
                                />
                            </div>
                            <div className="mb-3">
                                <div className="dropdown">
                                    <button
                                        className="btn btn-outline-secondary col-md-8 dropdown-toggle"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Select Shipping{" "}
                                        {shipping ? "(YES)" : "(NO)"}
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li
                                            className="dropdown-item cursorpoint"
                                            onClick={() => setShipping(true)}
                                        >
                                            Yes
                                        </li>
                                        <li
                                            className="dropdown-item cursorpoint"
                                            onClick={() => setShipping(false)}
                                        >
                                            No
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="mb-3">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleUpdate()}
                                >
                                    UPDATE PRODUCT
                                </button>
                            </div>
                            <div className="mb-3">
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete()}
                                >
                                    DELETE PRODUCT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateProduct;

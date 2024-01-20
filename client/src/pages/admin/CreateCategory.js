import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import Modal from "../../components/Modal";

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [updatedName, setUpdatedName] = useState("");
    const [selected, setSelected] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/category/create-category`,
                { name }
            );
            console.log(data);
            if (data?.success) {
                toast.success(`${data?.category?.name} is created`);
                setName("");
                getAllCategory();
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
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

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
                { name: updatedName }
            );
            console.log(data);
            if (data?.success) {
                toast.success(`${data?.category?.name} is Updated`);
                setSelected(null);
                setUpdatedName("");
                getAllCategory();
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Somthing Went Wrong In Updating Category");
        }
    };

    const handleDelete = async (pid) => {
        try {
            const { data } = await axios.delete(
                `${process.env.REACT_APP_API}/api/v1/category/delete-category/${pid}`
            );
            console.log(data);
            if (data?.success) {
                toast.success(`${data?.category?.name} is Deleted`);
                getAllCategory();
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Somthing Went Wrong In Deleting Category");
        }
    };

    useEffect(() => {
        if (categories.length === 0) {
            getAllCategory();
        }
    }, [categories]);

    return (
        <>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 text-center">
                        <h3 className="p-3">Manage Category</h3>
                        <div className="p-2  text-center">
                            <CategoryForm
                                handleSubmit={handleSubmit}
                                value={name}
                                setValue={setName}
                            />
                        </div>
                        <div className="table-responsive w-75 p-3">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((ele) => (
                                        <tr key={ele._id}>
                                            <th scope="row">{ele.name}</th>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary ms-2"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#staticBackdrop"
                                                    onClick={() => {
                                                        setUpdatedName(
                                                            ele.name
                                                        );
                                                        setSelected(ele);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger ms-2"
                                                    onClick={() =>
                                                        handleDelete(ele._id)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <Modal
                    value={updatedName}
                    setValue={setUpdatedName}
                    handleSubmit={handleUpdate}
                />
            </div>
        </>
    );
};

export default CreateCategory;

import React, { useEffect, useState } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [auth, setAuth] = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `${process.env.REACT_APP_API}/api/v1/auth/profile`,
                {
                    name,
                    email,
                    password,
                    phone,
                    address,
                }
            );
            if (data.success) {
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data?.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            error?.response?.data?.message
                ? toast.error(error.response.data.message)
                : toast.error("somthing went wrong");
        }
    };

    useEffect(() => {
        const { name, email, phone, address } = auth?.user;
        setName(name);
        setEmail(email);
        setPhone(phone);
        setAddress(address);
    }, [auth?.user]);

    return (
        <>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="text-center h-100">
                            <form
                                className="w-50 m-auto p-5"
                                onSubmit={handleSubmit}
                            >
                                <div className="row mb-3">
                                    <label
                                        htmlFor="Name"
                                        className="col-sm-2 col-form-label"
                                    >
                                        Name
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder="Enter Your Name"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label
                                        htmlFor="Email"
                                        className="col-sm-2 col-form-label"
                                    >
                                        Email
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="Email"
                                            placeholder="Enter Your Email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label
                                        htmlFor="inputPassword3"
                                        className="col-sm-2 col-form-label"
                                    >
                                        Password
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="inputPassword3"
                                            placeholder="Enter Your Password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label
                                        htmlFor="Phone"
                                        className="col-sm-2 col-form-label"
                                    >
                                        Phone No.
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="phone"
                                            placeholder="Enter Your Phone No."
                                            value={phone}
                                            onChange={(e) =>
                                                setPhone(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label
                                        htmlFor="address"
                                        className="col-sm-2 col-form-label"
                                    >
                                        Address
                                    </label>
                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="Address"
                                            placeholder="Enter Your address"
                                            value={address}
                                            onChange={(e) =>
                                                setAddress(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Update Profile
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;

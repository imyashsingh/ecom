import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/auth/register`,
                {
                    name,
                    email,
                    password,
                    phone,
                    address,
                }
            );
            console.log(res);
            if (res && res.data.success) {
                toast.success(res.data.message);
                navigate("/");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            error?.response?.data
                ? toast.error(error.response.data.message)
                : toast.error("somthing went wrong");
        }
    };

    return (
        <div className="text-center h-100">
            <form className="w-50 m-auto p-5" onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <label htmlFor="Name" className="col-sm-2 col-form-label">
                        Name
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Enter Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="Email" className="col-sm-2 col-form-label">
                        Email
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="email"
                            className="form-control"
                            id="Email"
                            placeholder="Enter Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
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
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="Phone" className="col-sm-2 col-form-label">
                        Phone No.
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            id="phone"
                            placeholder="Enter Your Phone No."
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
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
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">
                    Sign up
                </button>
            </form>
        </div>
    );
};

export default Register;

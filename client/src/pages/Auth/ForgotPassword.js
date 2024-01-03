import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [newPassword, setnewPassword] = useState("");
    const [answer, setAnswer] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
                {
                    email,
                    newPassword,
                    answer,
                }
            );
            navigate("/login");
            toast.success("Password Reset Successfully");
            console.log(res);
        } catch (error) {
            console.log(error);
            error?.response?.data?.message
                ? toast.error(error.response.data.message)
                : toast.error("somthing went wrong");
        }
    };

    return (
        <div className="text-center h-100">
            <form className="w-50 m-auto p-5" onSubmit={handleSubmit}>
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
                        New Password
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="password"
                            className="form-control"
                            id="inputPassword3"
                            placeholder="Enter Your Password"
                            value={newPassword}
                            onChange={(e) => setnewPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="answer" className="col-sm-2 col-form-label">
                        Enter your favorite show
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            id="answer"
                            placeholder="Enter Your answer"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">
                    Reset
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;

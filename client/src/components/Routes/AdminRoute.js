import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

const AdminRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth] = useAuth();
    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/auth/admin-auth`
            );
            console.log(res);
            if (res.data.ok) setOk(true);
            else setOk(false);
        };
        if (auth?.token && auth?.user?.role === 1) authCheck();
    }, [auth?.token, auth?.user?.role]);
    return ok ? <Outlet /> : <Spinner path={auth?.token ? "" : "login"} />;
};

export default AdminRoute;

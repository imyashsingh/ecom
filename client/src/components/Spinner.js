import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = ({ path = "" }) => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const intervel = setInterval(() => {
            setCount((prevValue) => --prevValue);
        }, 1000);
        count === 0 && navigate(`/${path}`, { state: location.pathname });
        return () => clearInterval(intervel);
    }, [count, navigate, location, path]);

    return (
        <>
            <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ height: "75vh" }}
            >
                <div>
                    <h4 className="p-3">Redirecting you in {count} second</h4>
                </div>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    );
};

export default Spinner;

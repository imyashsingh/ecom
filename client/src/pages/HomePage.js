import React from "react";
import { useAuth } from "../context/auth";

const HomePage = () => {
    const [auth] = useAuth();
    return (
        <>
            <div>HomePage</div>
            <pre>{JSON.stringify(auth)}</pre>
        </>
    );
};

export default HomePage;

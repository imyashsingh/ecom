import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";

const Users = () => {
    return (
        <>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 text-center ">
                        <h3>Users </h3>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Users;

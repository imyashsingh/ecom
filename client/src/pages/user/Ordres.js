import React from "react";
import UserMenu from "../../components/Layout/UserMenu";

const Ordres = () => {
    return (
        <>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <h3>Ordres</h3>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Ordres;

import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container">
                    <Link className="navbar-brand fw-bolder" to={"/fake-store"}>
                        <i className="fa-solid fa-vest-patches me-2"></i>
                        Fake Store
                    </Link>
                </div>
            </nav>
        </div>
    )
}
export default Navbar;
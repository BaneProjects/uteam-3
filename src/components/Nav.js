import {Link } from "react-router-dom";

const Nav = () => {
    return(
        <div className="header">
            <div className="headerLR">
                <Link to={"/"} className="headerLogin">Login</Link>
                <Link to={"register"} className="headerRegister">Register</Link>
            </div>
        </div>
    )
}

export default Nav;
import React from "react";
import Homepage from "../pages/Homepage";
import {useNavigate} from "react-router-dom";
// import {AppBar, Button, Toolbar} from "@mui/material";

const Header = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    }
    const handleSignUp = () => {
        navigate('/signup');
    }

    return (
        <>
            <div className="header">
                <h1>Logo</h1>
                <div className="button">
                    <button className="btn btn-primary button-wallet" onClick={handleLogin}>Log In</button>
                    <button className="btn btn-primary button-wallet mx-5" onClick={handleSignUp}>Sign Up</button>
                </div>
            </div>
        </>
    )
}

export default Header;
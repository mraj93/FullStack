import React from "react";
import {Link, useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
    }

    const handleSignUp = () => {
        navigate('/signup')
    }

    return(
        <>
            <div className="login-container my-5">
                <div className="login-content">
                    <h2><strong>Log In</strong></h2>
                    <form className="my-5">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" name="email" placeholder="Email" />
                        </div>
                        <div className="form-group my-5">
                            <label>Password</label>
                            <input type="password" name="password" placeholder="Password" />
                        </div>
                        <p className="forgot-password">Forgot password?</p>
                        <button type="submit" className="btn-primary login-button" onSubmit={handleLogin}>
                            <strong>Log In</strong>
                        </button>
                    </form>

                    {/*<p className="forgot-password">Forgot password?</p>*/}

                    <div>
                        <span>Don't have an account?</span>
                        <Link to="/signup">Sign Up</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;
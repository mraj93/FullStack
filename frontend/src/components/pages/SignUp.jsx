import React from "react";
import { Link } from 'react-router-dom';

const handleSignUp = () => {
    alert("got the message here:")
}

const SignUp = () => {
    return(
        <div className="login-container my-5">
            <div className="login-content">
                <h2><strong>Sign Up</strong></h2>
                <form className="my-5">
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" placeholder="Email" />
                    </div>
                    <div className="form-group my-5">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Password" />
                    </div>
                    <div className="form-group my-5">
                        <label>Confirm Password</label>
                        <input type="password" name="password" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn-primary login-button" onSubmit={handleSignUp}>
                        <strong>Sign Up</strong>
                    </button>
                </form>
                <div>
                    <span>Already have an account?</span>
                    <Link to="/login">Log In</Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
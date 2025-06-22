import { useState } from "react";
import {ShipWheelIcon} from "lucide-react";
import { Link } from "react-router-dom";
import '../styles/SignUpPage.css';
import useSignUp from "../hooks/useSignUp";

const SignUpPage = () => {

  const [signupData, setSignupData]=useState({
    fullName: "",
    email: "",
    password: "",
  });

  const {error, isPending, signupMutation}=useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);

  }
  
  return (
    <>
      <div className="signup-container">
        <div className="signup-content">
          <div className="signup-left">
            <div className="logo">
              <ShipWheelIcon size={28} />
              <span>Streamify</span>
            </div>
            {
              error && (
                <div className="error-messaging">
                  <span className="error-message">{error.response?.data?.message }</span>
                </div>
              )
            }
            <form onSubmit={handleSignup} className="form-box">
              <h2>Create an Account</h2>
              <p>Join Streamify and start your language learning adventure!</p>

              <div className="form-group">
                <label>Full Name:</label>
                <input
                  type="text"
                  placeholder="Enter your fullname"
                  value={signupData.fullName}
                  onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  required
                />
                <p style={{ color: "#888", fontSize: "0.8rem" }}>
                  Password must be at least 6 characters long
                </p>
              </div>

              <div className="checkbox-group">
                <label>
                  <input type="checkbox" required />
                  <span>I agree to the terms of service and privacy policy</span>
                  
                </label>
              </div>

              <button type="submit" className="signup-button">
                {isPending ? "Loading..." : "Create Account"}
              </button>

              <div className="link-text">
                <p>
                  Already have an account? <Link to="/login">Sign in</Link>
                </p>
              </div>
            </form>
          </div>

          <div className="signup-right">
            <img src="/rightside.png" alt="Language learning" />
            <h2>Connect with language partners worldwide</h2>
            <p>Practice conversations, make friends, and improve your language skills together</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUpPage
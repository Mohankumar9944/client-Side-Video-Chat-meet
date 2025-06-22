import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router-dom";
import '../styles/LoginPage.css';
import useLogin from "../hooks/useLogin";

const LoginPage = () => {

  const [loginData, setLoginData]=useState({
    email: "",
    password: "",
  })

  const {isPending, error, loginMutation} = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  }
  return (
    <>
      <div className="login-container">
        <div className="leftside">
          <div className="logo">
            <ShipWheelIcon size={28} />
            <span>Streamify</span>
          </div>

          {error && (
            <div className="error">
              <span>{error.response?.data?.message || "Login failed"}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div>
              <h2>Welcome Back</h2>
              <p>Sign in to your account to continue your language journey</p>
            </div>
            <div className="form-group">
              <div className="form-field">
                <label>
                  <span>Email:</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-field">
                <label>
                  <span>Password:</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  required
                />
              </div>
              <button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <span className="spinner" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
              <div className="register-redirect">
                <p>
                  Don't have an account?
                  <Link to="/signup">Create One</Link>
                </p>
              </div>
            </div>
          </form>
        </div>

        <div className="rightside">
          <div>
            <img src="/rightside.png" alt="Connect with language partners" />
            <div>
              <h2>Connect with language partners worldwide</h2>
              <p>
                Practice conversation, make friends, and improve your language
                skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { loginCall } from "../../apiCalls";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./login.css";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { user, isFatching, error, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  //   console.log(user);
  return (
    <div className="Login">
      <div className="LoginWrapper">
        <div className="LoginLeft">
          <h3 className="LoginLogo">Facebook</h3>
          <span className="LoginDesc">
            Conect with Friends and the Wrold around you
          </span>
        </div>
        <div className="LoginRight">
          <div className="LoginBox">
            <form className="LoginForm" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                required
                className="LoginInput fgroup"
                ref={email}
              />
              <input
                type="password"
                required
                placeholder="Password"
                className="LoginInput fgroup"
                ref={password}
              />
              <button className="LoginBtn fgroup" disabled={isFatching}>
                {isFatching ? (
                  <CircularProgress color="primary" size="20px" />
                ) : (
                  "Log In"
                )}
              </button>
              <span className="ForgotPassTxt fgroup">Forgot Password?</span>
              <Link className="RegisterLink" to="/register">
                <button className="RegisterBtn fgroup">
                  {isFatching ? (
                    <CircularProgress color="primary" size="20px" />
                  ) : (
                    "Create an account"
                  )}
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

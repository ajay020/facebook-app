import { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import "./register.css";

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();

  const confirmPassword = useRef();
  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();

    const user = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
    };

    if (password.current.value !== confirmPassword.current.value) {
      confirmPassword.current.setCustomValidity("Password didn't match");
    } else {
      try {
        await axios.post("/auth/register", user);
        history.push("/login");
      } catch (error) {
        console.log(error);
      }
    }

    console.log(user);
  };

  return (
    <div className="Register">
      <div className="RegisterWrapper">
        <div className="RegisterLeft">
          <h3 className="RegisterLogo">Facebook</h3>
          <span className="RegisterDesc">
            Conect with Friends and the Wrold around you
          </span>
        </div>
        <div className="RegisterRight">
          <div className="RegisterBox">
            <form className="RegisterForm" onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="Username"
                className="RegisterInput fgroup"
                ref={username}
                required
              />
              <input
                type="text"
                placeholder="Email"
                className="RegisterInput fgroup"
                ref={email}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="RegisterInput fgroup"
                ref={password}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="RegisterInput fgroup"
                ref={confirmPassword}
                required
              />
              <button type="submit" className="RegisterBtn fgroup">
                Sign Up
              </button>
              <Link className="LoginLink fgroup" to="/login">
                <button className="LoginBtn">Log In</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

"use client";
import React, {useState, useEffect} from "react";
import apiHandler from "@/app/utils/apiHandler.js"
import { useRouter } from "next/navigation";
import Checkbox from "../components/UI/Checkbox";
import OutlineButton from "../components/UI/OutlineButton";
import storeCookies from "../utils/storeCookies.js";
import deleteCookies from "../utils/deleteCookies.js";
import "./page.css";

function Login() {
  const router = useRouter();
  const maxChars = 20;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(0);
  const [remember, setRemember] = useState(false);

  function handlePasswordChange(event) {const { value } = event.target;
    setErrors(0);
    setPassword(value);
  }

  function handleNameChange(event) {
    const { value } = event.target;
    setErrors(0);
    if (value.length <= maxChars) {
      setUsername(value);
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  async function handleSubmit() {
    if (username.length === 0 && password.length === 0)
      {
        setErrors(3);
        return;
      }
    if (username.length === 0)
      {
        setErrors(1);
        return;
      }
    if (password.length === 0)
      {
        setErrors(2);
        return;
      }

      await loginSubmit();
  }

  const loginSubmit = async () => {

    //const response = await apiHandler("/login", "POST", bodyData);
    var response;
    try {
      const bodyData = {
        username: username,
        password: password,
        remember: remember,
      }
       response = await apiHandler("/login", "POST", bodyData);
      console.log(response);
      await deleteCookies();
    await storeCookies(response);
        router.push("/home");
    } catch (error) {
        setErrors(5);
      console.log(error);
    }
    
  };

  function getErrorMessage() {
      if (errors === 1)
        return "Username is required.";
      else if (errors === 2)
        return "Password is required.";
      else if (errors === 3)
        return "Both username and password are required.";
      else if (errors === 4)
        return "Incorrect username and/or password.";
      else
        return "unknown";
  }

  return (
    <section className="allPadding">
      <div className="container">
        <div className="positioning">
          <div className="signheader">
            <h2>APT Project</h2>
            <h4 style={{fontWeight: "300"}}>Karim Ayman - Amr Magdy - Salma Mahmoud - Malak Mohamed</h4>
          </div>
        </div>
        <div className="positioning">
          <div className="loginStyle">
            <h3>Sign In</h3>
            <div style={{ minWidth: "400px" }} >
              <div className="inputBoxFlex">
                <div className="icon loginIcon">
                  <svg
                    style={{ fill: "#fff" }}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  className="inputBoxStyle"
                  value={username}
                  onChange={handleNameChange}
                  onKeyDown={handleKeyPress}
                  placeholder="Username"
                  required=""
                />
              </div>
              <div className="inputBoxFlex">
                <div className="icon loginIcon">
                  <svg
                    style={{ fill: "#fff" }}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  onKeyDown={handleKeyPress}
                  className="inputBoxStyle"
                  placeholder="Password"
                  required=""
                />
              </div>
              {errors !== 0 ? <p style={{color: "red", textAlign:"center"}}>Error: {getErrorMessage()}</p> : ""}
              <div className="loginBottomFlex">
                <div style={{ width: "100%" }}>
                  <Checkbox isChecked={remember} onToggle={()=>{setRemember(!remember)}} label={"Remember Me"} />
                </div>
                <div style={{ marginRight: "4px" }}>
                  <OutlineButton btnClick={handleSubmit}>Login</OutlineButton>
                </div>
              </div>
              <div className="bottom">
                <p>Don't have an account?</p> <a href="signup"
                onClick={(event) => {
                  event.preventDefault();
                  router.push("/signup");
                  }}>
                  Sign Up
                  </a>
                {/*<p>
                  <a href="#">Forgot Password</a>
  </p>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;

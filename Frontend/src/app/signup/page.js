"use client";
import React, {useState, useEffect} from "react";
import apiHandler from "@/app/utils/apiHandler.js"
import { useRouter } from "next/navigation";
import Checkbox from "../components/UI/Checkbox";

import storeCookies from "../utils/storeCookies.js";
import deleteCookies from "../utils/deleteCookies.js";
import OutlineButton from "../components/UI/OutlineButton";
import styles from "./page.module.css";

function Signup() {
  const router = useRouter();
  const maxChars = 20;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [errors, setErrors] = useState(0);

  function handlePasswordChange(event) {const { value } = event.target;
    setErrors(0);
    setPassword(value);
  }

  function handlePassword1Change(event) {const { value } = event.target;
    setErrors(0);
    setPassword1(value);
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
    if (username.length === 0 && password.length === 0) {
      setErrors(3);
      return;
    }
    if (username.length === 0) {
      setErrors(1);
      return;
    }
    if (password.length === 0) {
      setErrors(2);
      return;
    }
    if (password1.length === 0) {
      setErrors(5);
      return;
    }
    if (password !== password1) {
      setErrors(4);
      return;
    }

      await loginSubmit();
  }

  const loginSubmit = async () => {
    try {
      const bodyData = {
        username: username,
        password: password,
        remember: false,
      }
      var ok = await apiHandler("/signup", "POST", bodyData);
      const response = await apiHandler("/login", "POST", bodyData);
      
      await deleteCookies();
      await storeCookies(response);
      console.log(response);
      router.push("/home");
    } catch (error) {
      console.log(error);
      if (error.message.includes("409")) {
        // Handle 401 Unauthorized error
        setErrors(6);
      } else {
        // Handle other errors
        setErrors(7);
        console.log("Error:", error);
      }
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
        return "Passwords don't match.";
      else if (errors === 5)
        return "Re-enter the password.";
      else if (errors === 6)
        return "Username already taken.";
      else
        return "unknown";
  }

  return (
    <section className={styles.allPadding}>
      <div className={styles.container}>
        <div className={styles.positioning}>
          <div className={styles.signheader}>
            <h2>APT Project</h2>
            <h4 style={{fontWeight: "300"}}>Karim Ayman - Amr Magdy - Salma Mahmoud - Malak Mohamed</h4>
          </div>
        </div>
        <div className={styles.positioning}>
          <div className={styles.loginStyle}>
            <h3>Sign Up</h3>
            <div style={{ minWidth: "400px" }}>
              <div className={styles.inputBoxFlex}>
                <div className={`${styles.icon} ${styles.loginIcon}`}>
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
                  className={styles.inputBoxStyle}
                  value={username}
                  onChange={handleNameChange}
                  onKeyDown={handleKeyPress}
                  placeholder="Username"
                  required=""
                />
              </div>
              <div className={styles.inputBoxFlex}>
                <div className={`${styles.icon} ${styles.loginIcon}`}>
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
                  className={styles.inputBoxStyle}
                  placeholder="Password"
                  required=""
                />
              </div>
              <div className={styles.inputBoxFlex}>
                <div className={`${styles.icon} ${styles.loginIcon}`}>
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
                      d="M10 5a2 2 0 0 0-2 2v3h2.4A7.48 7.48 0 0 0 8 15.5a7.48 7.48 0 0 0 2.4 5.5H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1V7a4 4 0 1 1 8 0v1.15a7.446 7.446 0 0 0-1.943.685A.999.999 0 0 1 12 8.5V7a2 2 0 0 0-2-2Z"
                      clip-rule="evenodd"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M10 15.5a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0Zm6.5-1.5a1 1 0 1 0-2 0v1.5a1 1 0 0 0 .293.707l1 1a1 1 0 0 0 1.414-1.414l-.707-.707V14Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="password"
                  value={password1}
                  onChange={handlePassword1Change}
                  onKeyDown={handleKeyPress}
                  className={styles.inputBoxStyle}
                  placeholder="Confirm Password"
                  required=""
                />
              </div>
              {errors !== 0 ? (
                <p style={{ color: "red", textAlign: "center" }}>
                  Error: {getErrorMessage()}
                </p>
              ) : (
                ""
              )}
              <div className={styles.loginBottomFlex}>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <OutlineButton
                    btnClick={handleSubmit}
                  >
                    Confirm
                  </OutlineButton>
                </div>
              </div>
              <div className={styles.bottom}>
                <p>Already have an account?</p> <a href="login" onClick={(event) => {
                  event.preventDefault();
                  router.push("/login")
                  }}>Sign In</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;

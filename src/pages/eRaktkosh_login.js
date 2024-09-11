import React, { useState, useEffect } from "react";
import bcrypt from "bcryptjs";
import axios from "axios";
import ERaktkosh_fgtPassword from "./eRaktkosh_fgtPassword";

const ERaktkoshLogin = () => {
  const [varUserName, setvarUserName] = useState("");
  const [varPassword, setvarPassword] = useState("");
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  useEffect(() => {
    const disableCopyPaste = (e) => {
      e.preventDefault();
      alert('Copying and pasting is not allowed!');
    };

    const usernameField = document.getElementById("username");
    const passwordField = document.getElementById("password");

    if (usernameField && passwordField) {
      usernameField.addEventListener('copy', disableCopyPaste);
      usernameField.addEventListener('cut', disableCopyPaste);
      usernameField.addEventListener('paste', disableCopyPaste);

      passwordField.addEventListener('copy', disableCopyPaste);
      passwordField.addEventListener('cut', disableCopyPaste);
      passwordField.addEventListener('paste', disableCopyPaste);
    }

    return () => {
      if (usernameField && passwordField) {
        usernameField.removeEventListener('copy', disableCopyPaste);
        usernameField.removeEventListener('cut', disableCopyPaste);
        usernameField.removeEventListener('paste', disableCopyPaste);

        passwordField.removeEventListener('copy', disableCopyPaste);
        passwordField.removeEventListener('cut', disableCopyPaste);
        passwordField.removeEventListener('paste', disableCopyPaste);
      }
    };
  }, []);

  const handleUsernameChange = (event) => {
    setvarUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setvarPassword(event.target.value);
  };

  const validate = () => {
    if (varUserName.trim() === "" || varPassword.trim() === "") {
      setError("User Name / Password is empty!");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    }

    if (!validateAlphaNumWithUnderscoreValue(varUserName)) {
      setError("Username should be alphanumeric with underscore only!");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    }

    if (varUserName.length >= 30 || varPassword.length >= 30) {
      setError("Username & Password are too long");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    }

    setError("");
    return true;
  };

  const hashCredentials = async (username, password) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password + username, salt);
      const hashedPassword1 = await bcrypt.hash(password, salt);

      const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
      const characters1 = 'erwtewritpoe#$%#$%fdgdfgd0123456789';

      let result = '';
      let result1 = '';

      for (let i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
        result1 += characters1.charAt(Math.floor(Math.random() * characters1.length));
      }

      const finalPassword = result1 + hashedPassword1 + result;
      return { username, password: finalPassword };
    } catch (error) {
      console.error("Error hashing credentials:", error);
      throw new Error("Error hashing credentials");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const { setvarusername, setvarpassword } = await hashCredentials(varUserName, varPassword);

      const response = await axios.post("http://10.226.17.67:8380/eRaktKosh/hissso/loginLogin", {
        varUserName: setvarusername,
        varPassword: setvarpassword,
      });

      if (response.status === 200) {
        const data = response.data;
        console.log("Login successful:", data);
        setError("");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid Credentials");

      setTimeout(() => {
        setError("");
      }, 3000);
    }
    setvarUserName("");
    setvarPassword("");
  };

  const validateAlphaNumWithUnderscoreValue = (val) => {
    const pattern = /^[a-zA-Z0-9_]*$/;
    return pattern.test(val);
  };

  const showForgotPasswordModal = () => {
    setShowForgotPassword(true);
  };

  const closeForgotPasswordModal = () => {
    setShowForgotPassword(false);
  };

  return (
    <>
      <section className="loginSection">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 d-none d-lg-block d-xl-block d-md-block col-lg-8 col-md-8">
              <div className="loginImg">
                <img className="img-fluid" src="assets/images/loginImg.png" alt="" />
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-4">
              <div className="minimise-text">
                <p className="mb-0 e-login">eRaktkosh Login</p>
                <p className="mb-0 bb-login">Blood Bank Login: Portal/Application</p>
              </div>
              <div className="form-container d-flex">
                <form action="#" method="POST" onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">
                      Username
                    </label>
                    <div className="input-group mb-1">
                      <span className="input-group-text p-0" id="basic-addon1">
                        <img src="assets/images/inputPerson.png" alt="" />
                      </span>
                      <input
                        type="text"
                        className="form-control py-0"
                        placeholder="Enter Your Username"
                        id="username"
                        value={varUserName}
                        onChange={handleUsernameChange}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                  </div>

                  <div className="">
                    <label htmlFor="exampleInputEmail1" className="form-label mb-1">
                      Password
                    </label>
                    <div className="input-group mb-1">
                      <span className="input-group-text p-0" id="basic-addon1">
                        <img src="assets/images/password.png" alt="" />
                      </span>
                      <input
                        type="password"
                        className="form-control py-0"
                        placeholder="Enter Your Password"
                        id="password"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                        value={varPassword}
                        onChange={handlePasswordChange}
                      />
                    </div>
                  </div>

                  <a href="javascript:void(0)" className="text-end d-block form-text mb-4" onClick={showForgotPasswordModal}>Forgot Password?</a>

                  <div className="mb-3">
                    <button
                      type="submit"
                      className="w-100 btn btn-primary-signIn py-2"
                    >
                      Sign in
                    </button>
                  </div>

                  <p className="option text-center">or</p>

                  <div className="mb-3">
                    <button
                      type="button"
                      className="w-100 btn btn-primary-outline py-2"
                    >
                      Sign in with e-Pramaan
                    </button>
                  </div>

                  <div className="mb-3">
                    <button
                      type="button"
                      className="w-100 btn btn-primary-outline py-2"
                    >
                      Sign in with Parichay
                    </button>
                  </div>

                  {error && (
                    <div className="mt-3" role="alert">
                      <div className="d-flex align-items-center justify-content-center">
                        <img
                          className="me-1"
                          height="16px"
                          width="16px"
                          src="assets/images/error.png"
                          alt=""
                        />
                        <p className="form-text my-0">{error}</p>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ERaktkosh_fgtPassword showModal={showForgotPassword} closeModal={closeForgotPasswordModal} />
    </>
  );
};

export default ERaktkoshLogin;

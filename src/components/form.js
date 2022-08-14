import { useState } from "react";
import useInput from "../hooks/useInput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { computeHeadingLevel } from "@testing-library/react";

let publicurl = process.env.REACT_APP_PUBLIC_URL;

const Form = () => {
  const [message, setMessage] = useState("");
  const {
    value: enteredName,
    isValid: enteredNameisValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailisValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(
    (value) => value.trim() !== "" && value.includes("@") && value.includes(".")
  );

  const {
    value: enteredPass,
    isValid: enteredPassisValid,
    hasError: passHasError,
    valueChangeHandler: passChangeHandler,
    inputBlurHandler: passBlurHandler,
    reset: resetpassInput,
  } = useInput((value) => value.trim() !== "");

  let isFormValid = false;
  if (enteredNameisValid && enteredEmailisValid && enteredPassisValid) {
    isFormValid = true;
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();
    var message = [];
    var jsonData = {
      name: enteredName,
      email: enteredEmail,
      password: enteredPass,
    };
    // Send data to the backend via POST
    fetch(publicurl + "signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.message === "string") {
          toast.success(data.message);
        } else {
          toast.error(JSON.stringify(data.message[0].constraints));
        }
      })
      .catch((err) => {
        console.log("Error Occurred in Function Call Event.");
      });

    // resetNameInput();
    // resetEmailInput();
    // resetpassInput();
  };
  return (
    <>
      <ToastContainer />
      <div className="container mt-8">
        <div className="flp-form-region">
          <div className="row flp-form-region-box">
            <div className="col-lg-7 col-md-8 col-sm-12">
              <div className="ml-5 mt-5">
                <p className="flp-form-main-content pt-5">
                  Receive payments quickly <br />
                  from anywhere
                </p>
                <p className="flp-form-text-content">
                  Why kept very ever home mrs. Considered sympathize ten
                  uncommonly occasional assistance sufficient not. Letter of on
                  become he tended active enable to.
                </p>
              </div>
            </div>
            <div className="col-lg-5 col-md-8 col-sm-12">
              <p className="flp-form-text mt-5 ml-2">Get Started for Free</p>
              <section>
                <div className="row">
                  <div className="col-lg-10 col-md-12 col-sm-12 m-2">
                    <input
                      type="text"
                      className="txtBox white m-0.5"
                      autoComplete="off"
                      value={enteredName}
                      onChange={nameChangeHandler}
                      onBlur={nameBlurHandler}
                      placeholder="Name"
                    ></input>
                    {nameHasError && <p>Name is required.</p>}
                  </div>
                  <div className="col-lg-10 col-md-12 col-sm-12 m-2">
                    <input
                      type="text"
                      className="txtBox white m-0.5"
                      autoComplete="off"
                      value={enteredEmail}
                      onChange={emailChangeHandler}
                      onBlur={emailBlurHandler}
                      name="email"
                      id="email"
                      placeholder="Email Address"
                    ></input>
                    {emailHasError && <p>Please Provide Valid Email ID.</p>}
                  </div>
                  <div className="col-lg-10 col-md-12 col-sm-12 m-2">
                    <input
                      type="password"
                      value={enteredPass}
                      onChange={passChangeHandler}
                      onBlur={passBlurHandler}
                      name="userpass"
                      id="userpass"
                      placeholder="6 Characters atleast"
                      className="txtBox white m-0.5"
                    ></input>
                    {passHasError && <p>Please Provide Password.</p>}
                  </div>
                  <div className="col-lg-10 col-md-12 col-sm-12 m-2">
                    <button
                      type="submit"
                      onClick={formSubmitHandler}
                      disabled={!isFormValid}
                      className="btn btnSignIn"
                    >
                      GET STARTED
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Form;

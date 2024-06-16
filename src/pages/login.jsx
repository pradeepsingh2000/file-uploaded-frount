import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../schema";
import { loginUser } from "../redux/apis/auth";
import toastResponse from "../utils/toastResponse";
import { setUser } from "../redux/reducer/authSlice";
import { useDispatch } from "react-redux";
import { warn } from "../Const";
export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    password: "",
    email: "",
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        loginUser(values)
          .then((data) => {
            if (data.success) {
              toastResponse.success(data.message);
              dispatch(setUser(data.data));
              localStorage.setItem("token", data.data.token);
              navigate("/home");
            } else {
              toastResponse.error(data.message);
            }
          })
          .catch((err) => {
            toastResponse.error(err.message);
          });
      },
    });

  const loginContainer = {
    backgroundPosition: "center center",
    backgroundSize: "cover",
    position: "fixed",
    overflow: "auto",
    top: 0,
    bottom: 0,
  };

  return (
    <div>
      <div className="container-fluid" style={loginContainer}>
        <div className="form-container">
          <div className="login-icon"></div>
          <div className="login-title ">Sign in to your account</div>
          <form className="pa-24">
            <div className="form-group d-flex flex-column m-2">
              <input
                type="email"
                className="form-control react-form-input"
                id="email"
                onChange={handleChange}
                value={values.email}
                onBlur={handleBlur}
                placeholder="Email"
              />
              {touched.email && errors.email ? (
                <p style={warn}>{errors.email}</p>
              ) : null}
            </div>

            <div className="form-group d-flex flex-column  m-2">
              <input
                type="password"
                className="form-control react-form-input"
                id="password"
                onChange={handleChange}
                value={values.password}
                onBlur={handleBlur}
                placeholder="Password"
              />
              {touched.password && errors.password ? (
                <p style={warn}>{errors.password}</p>
              ) : null}
            </div>

            <button
              type="submit"
              className="btn form-button mt-3"
              onClick={(e) => handleSubmit(e)}
            >
              Login
            </button>
            <div
              className="text-center link-label"
              onClick={() => navigate("/register")}
            >
              Sing Up ?
            </div>
          </form>
        </div>
        {loading && <Loader />}
      </div>
    </div>
  );
}

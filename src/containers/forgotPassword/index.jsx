import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, sendPasswordReset } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  Button,
} from "@mui/material";
import "../logIn/style.css";
import { validateEmail } from "../../core/utils/validateForm/validateForm";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [vaildEmail, setValidEmail] = useState(false);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const onChangeEmail = (e) => {
    if (e.target.value === "") {
      setErrorEmail("Email is not empty");
      setValidEmail(false);
    } else {
      if (!validateEmail(e.target.value)) {
        setErrorEmail("Invalid email");
        setValidEmail(false);
      } else {
        setErrorEmail("");
        setValidEmail(true);
      }
    }
    setEmail(e.target.value);
  };
  const onBlurEmail = (e) => {
    if (!e.target.value) {
      setErrorEmail("Email is not empty");
    } else {
      setErrorEmail("");
    }
  };
  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/");
  }, [user, loading, navigate]);
  return (
    <div className="content-login flex-box flex-column">
      <div className="wrapper-form">
        <h3 className="title-login">Forgot Password</h3>
        <Box component="form" autoComplete="off" className="form-login">
          <FormControl fullWidth sx={{ m: 1 }} className="form-control">
            <InputLabel htmlFor="forgot-email">Email</InputLabel>
            <OutlinedInput
              className="login-input"
              id="forgot-email"
              type="text"
              label="Email"
              placeholder="@gmail.com"
              onChange={(e) => onChangeEmail(e)}
              onBlur={(e) => onBlurEmail(e)}
              startAdornment={
                <InputAdornment
                  className="none"
                  position="start"
                ></InputAdornment>
              }
            />
            <FormHelperText className="error-message">
              {errorEmail}
            </FormHelperText>
          </FormControl>
        </Box>
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <Button
            variant="contained"
            disabled={!vaildEmail}
            className="btn-button btn-forgot"
            onClick={() => sendPasswordReset(email)}
          >
            Send For Nhun Cuteee
          </Button>
        </div>
        <div style={{ textAlign: "center", marginBottom: "15px" }}>
          Nhun Cuteee have account{" "}
          <Link to="/login" className="link-login">
            Log In
          </Link>
        </div>
        <p style={{ textAlign: "center", marginBottom: "15px" }}>
          Or login with
        </p>
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          Nhun Cuteee don't have account{" "}
          <Link to="/signup" style={{ color: "red" }}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
  signInWithGithub
} from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { 
  Box, 
  FormControl, 
  InputLabel, 
  OutlinedInput, 
  InputAdornment, 
  FormHelperText, 
  IconButton,
  Button
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import './style.css';
import {validateEmail, validPassword} from '../../core/utils/validateForm/validateForm';

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [vaildEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [vaildPassword, setValidPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/");
  }, [user, loading, navigate]);

  const onChangeEmail = (e) => {
    if(e.target.value === '') {
      setErrorEmail('Email is not empty');
      setValidEmail(false);
    }else {
      if(!validateEmail(e.target.value)) {
        setErrorEmail('Invalid email');
        setValidEmail(false);
      }else{
        setErrorEmail('');
        setValidEmail(true);
      }
    }
    setEmail(e.target.value);
  }
  const onBlurEmail = (e) => {
    if(!e.target.value) {
      setErrorEmail('Email is not empty');
    }else {
      setErrorEmail('');
    }
  }
  const onChangePassword = (e) => {
    if(e.target.value === '') {
      setErrorPassword('Password is not empty');
      setValidPassword(false);
    }else {
      if(!validPassword(e.target.value) && !e.target.value.lenght < 8) {
        setErrorPassword('Password has 1 special character, 1 number and more than 8 characters');
        setValidPassword(false);
      }else {
        setErrorPassword('');
        setValidPassword(true);
      }
    }
    setPassword(e.target.value);
  }
  const onBlurPassword = (e) => {
    if(!e.target.value) {
      setErrorPassword('Password is not empty');
    }else {
      setErrorPassword('');
    }
  }
  const onClickShowPassword = () => setShowPassword((showPassword) => !showPassword);
  const loginGoogle = () => {
    signInWithGoogle();
  }
  return (
    <div className="content-login flex-box flex-column">
      <div className="wrapper-form">
        <h3 className="title-login">Log In</h3>
        <Box component="form" autoComplete="off" className="form-login">
          <FormControl fullWidth sx={{ m: 1 }} className="form-control">
            <InputLabel htmlFor="login-email">Email</InputLabel>
            <OutlinedInput 
            className="login-input"
            id="login-email"
            type="text"
            label="Email"
            placeholder="@gmail.com"
            onChange={e => onChangeEmail(e)}
            onBlur={e => onBlurEmail(e)}
            startAdornment={<InputAdornment className="none" position="start"></InputAdornment>}
            />
            <FormHelperText className="error-message">{errorEmail}</FormHelperText>
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }} className="form-control">
            <InputLabel htmlFor="login-password">Password</InputLabel>
            <OutlinedInput 
            className="login-input"
            id="login-password"
            label="Password"
            placeholder="password"
            onChange={e => onChangePassword(e)}
            onBlur={e => onBlurPassword(e)}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={onClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            startAdornment={<InputAdornment className="none" position="start"></InputAdornment>}
            />
            <FormHelperText className="error-message">{errorPassword}</FormHelperText>
          </FormControl>
        </Box>
        <div style={{marginBottom: "15px", justifyContent: "center"}} className="flex-box">
          <Button variant="contained" disabled={!(vaildEmail && vaildPassword)} className="btn-button btn-login" onClick={() => logInWithEmailAndPassword(email,password)}>Log In</Button>
          <Link variant="contained" className="btn-forgot" to="/forgot-password">Forgot Password</Link>
        </div>
        <p style={{textAlign: "center", marginBottom: "15px"}}>Or login with</p>
        <div className="quick-login flex-box" style={{marginBottom: "25px"}}>
          <button className="btn-quick btn-google" onClick={loginGoogle} style={{marginRight: "7px"}}><GoogleIcon/></button>
          <button className="btn-quick" style={{marginLeft: "7px"}} onClick={signInWithGithub}><GitHubIcon/></button>
        </div>
        <div style={{textAlign: "center"}}>
          Nhun cuteee don't have account <Link to='/signup' style={{color: "red"}}>Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
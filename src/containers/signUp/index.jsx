import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
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
import toast , { Toaster } from 'react-hot-toast';
import '../logIn/style.css';
import {validateEmail, validPassword} from '../../core/utils/validateForm/validateForm';

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [vaildEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [vaildPassword, setValidPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/");
  }, [user, loading, navigate]);

  const onChangeUsername = (e) => {
    if(e.target.value === '') {
      setErrorUsername('Username is not empty');
      setValidUsername(false);
    }else {
      setErrorUsername('');
      setValidUsername(true);
    }
    setUsername(e.target.value);
  }
  const onBlurUsername = (e) => {
    if(!e.target.value) {
      setErrorUsername('Username is not empty');
    }else {
      setErrorUsername('');
    }
  }

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
    setPassword(e.target.value);
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
  }
  const onBlurPassword = (e) => {
    if(!e.target.value) {
      setErrorPassword('Password is not empty');
    }else {
      setErrorPassword('');
    }
  }
  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if(e.target.value === '') {
      setErrorConfirmPassword('Confirm password is not empty');
      setValidConfirmPassword(false);
    }else {
      setErrorConfirmPassword('');
      setValidConfirmPassword(true);
    }
  }
  const onBlurConfirmPassword = (e) => {
    if(!e.target.value) {
      setErrorConfirmPassword('Password is not empty');
    }else {
      setErrorConfirmPassword('');
    }
  }
  const onClickShowPassword = () => setShowPassword((showPassword) => !showPassword);
  const onSignup = (name, email, password) => {
    if(password !== confirmPassword) {
      toast.error('Confirm password is not correctttttt (((:');
      return;
    }
    registerWithEmailAndPassword(name, email, password);
  }
  return (
    <div className="content-login flex-box flex-column">
      <div className="wrapper-form">
        <h3 className="title-login">Sign Up</h3>
        <Box component="form" autoComplete="off" className="form-login">
          <FormControl fullWidth sx={{ m: 1 }} className="form-control">
            <InputLabel htmlFor="signup-username">Username</InputLabel>
            <OutlinedInput 
            className="login-input"
            id="signup-username"
            type="text"
            label="Username"
            placeholder="nhuncute"
            onChange={e => onChangeUsername(e)}
            onBlur={e => onBlurUsername(e)}
            startAdornment={<InputAdornment className="none" position="start"></InputAdornment>}
            />
            <FormHelperText className="error-message">{errorUsername}</FormHelperText>
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }} className="form-control">
            <InputLabel htmlFor="signup-email">Email</InputLabel>
            <OutlinedInput 
            className="login-input"
            id="signup-email"
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
            <InputLabel htmlFor="signup-password">Password</InputLabel>
            <OutlinedInput 
            className="login-input"
            id="signup-password"
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
          <FormControl fullWidth sx={{ m: 1 }} className="form-control">
            <InputLabel htmlFor="confirm-password">Confirm password</InputLabel>
            <OutlinedInput 
            className="login-input"
            id="confirm-password"
            label="Confirm password"
            placeholder="password"
            onChange={e => onChangeConfirmPassword(e)}
            onBlur={e => onBlurConfirmPassword(e)}
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
            <FormHelperText className="error-message">{errorConfirmPassword}</FormHelperText>
          </FormControl>
        </Box>
        <div style={{marginBottom: "15px", textAlign: "center"}}>
          <Button variant="contained" disabled={!(vaildEmail && vaildPassword && validUsername && validConfirmPassword)} className="btn-button btn-singup" style={{marginRight: "0 !important"}} onClick={() => onSignup(username, email, password)}>Sign Up</Button>
        </div>
        <div style={{textAlign: "center"}}>
          Nhun cuteeee have account <Link to='/login' className="link-login">Log In</Link>
        </div>
      </div>
    </div>
  );
}
import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import LogIn from "./containers/logIn";
import SignUp from "./containers/signUp";
import Header from './components/header';
import Gallery from './containers/gallery';
import NewDiary from './containers/newDiary';
import Loading from "./core/common/loading/loading";
import Home from "./containers/home";
import "./core/style/common.css";
import { Toaster } from 'react-hot-toast';
import Categories from "./containers/categories";
import Profile from "./containers/profile";
import ForgotPassword from "./containers/forgotPassword";
import SingleDiary from "./containers/singleDiary";
import Footer from "./components/footer";

function App() {
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if(user) {
    }
  }, [loading, user]);
  if (loading) {
    return <Loading/>;
  }
  return (
    <div className="app">
      <div className="site-wrapper" style={{justifyContent: "space-between"}}>
        <Toaster position="top-right"/>
        <Router>
          {user && <Header/>}
          <Routes>
            <Route
              exact
              path="/"
              element={user ? <Home /> : <Navigate replace to={"/login"} />}
            />
            <Route exact path="/login" element={<LogIn />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/forgot-password" element={<ForgotPassword />} />
            <Route exact path="/new-diary" element={<NewDiary />} />
            <Route exact path="/gallery" element={<Gallery />} />
            <Route exact path="/categories" element={<Categories />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/single-diary/:uid" element={<SingleDiary />} />
          </Routes>
          {user && <Footer/>}
        </Router>
      </div>
    </div>
  );
}

export default App;
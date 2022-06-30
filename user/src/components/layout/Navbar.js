import React, {useContext} from "react";
import { UserContext } from "../../UserContext";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const logout = async () => {
    try {
      const res = await fetch("http://localhost:5000/logout", {
        credentials: "include",
      });
      const data = res.json();
      console.log("logout data", data);
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <nav className="green">
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">
            WhatChat
          </a>
          <a href="#" data-target="mobile-demo" class="sidenav-trigger">
            <i class="material-icons">menu</i>
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a href="/login">Login</a>
            </li>
            <li onClick={logout}>
              <a href="#">Logout</a>
            </li>
            <li>
              <a href="/signup">SignUp</a>
            </li>
          </ul>
        </div>
      </nav>
      <ul className="sidenav" id="mobile-demo">
        <li >
          <a href="/login" >Login</a>
        </li>
        <li onClick={logout}>
          <a href="#">Logout</a>
        </li>
        <li>
          <a href="/signup">SignUp</a>
        </li>
      </ul>
    </>
  );
};

export default Navbar;

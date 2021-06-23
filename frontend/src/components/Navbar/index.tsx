import React from "react";

import Button from "../Button/index";

import s from "./Navbar.module.css";
import logo from "../../assets/images/logo.svg";

const Navbar = () => {
  return (
    <nav className={s.root}>
      <div className={s.logo_container}>
        <img src={logo} alt="logo" />
        <p className={s.logo_text}>Donunk</p>
      </div>
      <div className={s.link_container}>
        <p className={s.link}>FAQ</p>
        <p className={s.link}>Donate to a star</p>
        <Button>Connect wallet</Button>
      </div>
    </nav>
  );
};

export default Navbar;

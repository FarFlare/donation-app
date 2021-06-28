import React from "react";

import Button from "../Button/index";
import chainStore from "../../stores/chainStore";

import s from "./Navbar.module.css";
import logo from "../../assets/images/logo.svg";
import loader from "../../assets/images/loader-white.svg";
import { observer } from "mobx-react-lite";

const Navbar = observer(() => {
  const onConnectClick = async () => {
    try {
      await chainStore.loadWeb3();
      await chainStore.loadBlockChain();
    } catch (error) {}
  };

  return (
    <nav className={s.root}>
      <div className={s.logo_container}>
        <img src={logo} alt="logo" />
        <p className={s.logo_text}>Donunk</p>
      </div>
      <div className={s.link_container}>
        <p className={s.link}>FAQ</p>
        <p className={s.link}>Donate to a star</p>
        <Button onClick={onConnectClick}>
          {chainStore.web3Loading ? <img src={loader} alt='loader' /> : (chainStore.connected ? "Connected" : "Connect wallet")}
        </Button>
      </div>
    </nav>
  );
});

export default Navbar;

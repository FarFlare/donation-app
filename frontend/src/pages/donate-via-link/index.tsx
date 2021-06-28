import React, { useState } from "react";

import { useLocation } from "react-router-dom";

import Layout from "../../components/Layout";
import Input from "../../components/Input";

import s from "./DonateLink.module.css";
import link from "../../assets/images/link.svg";
import arrow from "../../assets/images/arrow.svg";
import eth from "../../assets/images/eth.svg";


const DonateViaLink = () => {
  const [address, setAddress] = useState("");
  const location = useLocation();

  return (
    <Layout>
      <div className={s.root}>
        <div className={s.title_container}>
          <div className={s.row}>
            <p className={s.title}>Donate via the</p>
            <div className={s.icon_container}>
              <img src={link} alt="link-logo" />
            </div>
            <p className={s.title}>link</p>
          </div>
        </div>
        <p className={s.link_orange}>{`donunk.io${location.pathname}`}</p>
        <div className={s.form_item}>
          <div className={s.input_label_container}>
            <p className={s.input_label}>Enter your wallet address</p>
            <p className={s.input_description}>
              to generate a link to receive donations
            </p>
          </div>
          <div className={s.input_group}>
            <Input
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={s.input}
            />
            <div className={s.eth_container}>
              <div className={s.eth_icon}>
                <img src={eth} alt="eth" />
              </div>
              <div className={s.eth_text}>ETH</div>
            </div>
            <button className={s.input_button}>
              <img src={arrow} alt="arrow" />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DonateViaLink;

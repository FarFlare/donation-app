import React, { useState } from "react";
import cs from "classnames";

import Layout from "../../components/Layout";
import Input from "../../components/Input";
import Footer from "../../components/Footer";

import s from "./Main.module.css";
import link from "../../assets/images/link.svg";
import polygon from "../../assets/images/Polygon.svg";
import vector from "../../assets/images/Vector.svg";
import check from "../../assets/images/check-icon.svg";
import copy from "../../assets/images/copy.svg";
import arrow from "../../assets/images/arrow.svg";
import loader from "../../assets/images/loader.svg";

const MainPage = () => {
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [donationLink, setDonationLink] = useState("");

  return (
    <Layout>
      <div className={s.root}>
        <div className={s.title_container}>
          <div className={s.row}>
            <p className={s.title}>Generate a </p>
            <div className={s.icon_container}>
              <img src={link} alt="link-logo" className={s.link_icon} />
            </div>
            <p className={s.title}>link</p>
          </div>
          <div className={s.row}>
            <p className={s.title}>to get</p>
            <div className={s.polygon_icon_container}>
              <img src={polygon} alt="polygon" className={s.polygon_icon} />
            </div>
            <p className={s.title}>donation</p>
          </div>
        </div>
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
            <button className={s.input_button}>
              <img
                src={loading ? loader : donationLink ? check : arrow}
                alt="check"
              />
            </button>
          </div>
        </div>
        <div className={s.form_item}>
          <div className={s.input_label_container}>
            <p className={cs(s.input_label, s.text_orange)}>
              Your donation link
            </p>
            <p className={s.input_description}>
              copy and share in social network
            </p>
          </div>
          <div className={s.input_group}>
            <Input name="link" value={donationLink} className={s.input} />
            <button className={s.input_button}>
              <img src={copy} alt="copy" />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
};

export default MainPage;

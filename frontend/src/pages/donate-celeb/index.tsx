import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";

import Layout from "../../components/Layout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Footer from "../../components/Footer";

import chainStore from '../../stores/chainStore';

import s from "./DonateCeleb.module.css";
import star from "../../assets/images/star.svg";
import twitter from "../../assets/images/twitter.svg";
import arrow from "../../assets/images/arrow.svg";
import loader from "../../assets/images/loader.svg";

const DonateToCeleb = observer(() => {
  const [sum, setSum] = useState("");
  const [nickname, setNickname] = useState("");
  const [nicknameSuccess, setNicknameSuccess] = useState(false);
  const [nicknameError, setNicknameError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { push } = useHistory();

  const onNickNameSubmit = () => {
    if (nickname) setNicknameSuccess(true);
  };

  const onDonateClick = async () => {
    try {
      const wei = window.web3.utils.toWei(sum, 'ether');
      if (wei > '0') {
        const { distributorContract, tokenContract, address } = chainStore;
        setLoading(true);
        const allowance = await tokenContract.methods.allowance(address, distributorContract._address).call();
        console.log(allowance, 'allowance');
        console.log(wei, 'sum')
        if (wei <= allowance) {
          const hash = await distributorContract.methods.donateToPoolErc20(`twitter:${nickname}`, tokenContract._address, wei).send({ from: address });
          await window.web3.eth.getTransaction(
            hash.transactionHash,
            async (error, trans) => {
              setLoading(false);
              setSuccess(true);
            }
          );
        } else {
          const hash = await tokenContract.methods.increaseAllowance(distributorContract._address, wei).send({ from: address });
          await window.web3.eth.getTransaction(
            hash.transactionHash,
            async (error, trans) => {
              onDonateClick();
            }
          );
        }
      }
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className={s.root}>
      <div className={s.title_container}>
          <div className={s.row}>
            <p className={s.title}>Donate to a</p>
            <div className={s.icon_container}>
              <img src={star} alt="star-logo" className={s.link_icon} />
            </div>
            <p className={s.title}>celebrity</p>
          </div>
          {!nicknameSuccess && !nicknameError && <div className={s.row}>
            <p className={s.title}>using only</p>
            <div className={s.polygon_icon_container}>
              <img src={twitter} alt="twitter" className={s.polygon_icon} />
            </div>
            <p className={s.title}>nickname</p>
          </div>}
        </div>
        {nicknameSuccess && <p className={s.link_orange}>{nickname}</p>}
        {nicknameError && <p className={s.link_orange}>Nickname is wrong. Please try again</p>}
        {nicknameSuccess && !chainStore.connected && <Button>Connect wallet</Button>}
        {nicknameSuccess && !success && <div className={s.form_item}>
          <div className={s.input_label_container}>
            <p className={s.input_label}>Enter the number of miMATIC</p>
            <p className={s.input_description}>
              you want to donate using the link above
            </p>
          </div>
          <div className={s.input_group}>
            <Input
              name="sum"
              value={sum}
              onChange={(e) => setSum(e.target.value)}
              className={s.input}
            />
            {/* <div className={s.eth_container}>
              <div className={s.eth_icon}>
                <img src={eth} alt="eth" />
              </div>
              <div className={s.eth_text}>ETH</div>
            </div> */}
            <button className={s.input_button} onClick={onDonateClick}>
              <img src={loading ? loader : arrow} alt="arrow" />
            </button>
          </div>
        </div>}
        {chainStore.connected && !nicknameSuccess && <div className={s.form_item}>
          <div className={s.input_label_container}>
            <p className={s.input_label}>Enter Twitter nickname of celebrity</p>
            <p className={s.input_description}>
              to whom you want to donate money
            </p>
          </div>
          <div className={s.input_group}>
            <Input
              name="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className={s.input}
            />
            <button className={s.input_button} onClick={onNickNameSubmit}>
              <img src={loading ? loader : arrow} alt="arrow" />
            </button>
          </div>
        </div>}
        {
          success && <>
            <p className={s.succes_text}>{`You have successfully donated ${sum} tokens`}</p>
            <Button className={s.mb50} onClick={() => push('/donation-app')}>Make own donation link</Button>
          </>
        }
      </div>
      <Footer />
    </Layout>
  );
});

export default DonateToCeleb;

import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useHistory, useLocation } from "react-router-dom";

import Layout from "../../components/Layout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Footer from "../../components/Footer";

import chainStore from '../../stores/chainStore';

import s from "./DonateLink.module.css";
import link from "../../assets/images/link.svg";
import arrow from "../../assets/images/arrow.svg";
import eth from "../../assets/images/eth.svg";
import loader from "../../assets/images/loader.svg";

const DonateViaLink = observer(() => {
  const [sum, setSum] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { pathname } = useLocation();
  const { push } = useHistory();

  const onDonateClick = async () => {
    try {
      const { distributorContract, tokenContract, address } = chainStore;
      setLoading(true);
      const allowance = await tokenContract.methods.allowance(address, distributorContract._address).call();
      console.log(allowance, 'allowance');
      console.log(sum, 'sum')
      if (sum <= allowance) {
        const hash = await distributorContract.methods.donateErc20(pathname.split('/')[2], tokenContract._address, sum).send({ from: address })
        await window.web3.eth.getTransaction(
          hash.transactionHash,
          async (error, trans) => {
            setLoading(false);
            setSuccess(true);
          }
        );
      } else {
        const hash = await tokenContract.methods.increaseAllowance(distributorContract._address, sum).send({ from: address });
        await window.web3.eth.getTransaction(
          hash.transactionHash,
          async (error, trans) => {
            onDonateClick();
          }
        );
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
            <p className={s.title}>Donate via the</p>
            <div className={s.icon_container}>
              <img src={link} alt="link-logo" />
            </div>
            <p className={s.title}>link</p>
          </div>
        </div>
        <p className={s.link_orange}>{`donunk.io${pathname}`}</p>
        {!chainStore.connected && <Button>Connect wallet</Button>}
        {chainStore.connected && !success && <div className={s.form_item}>
          <div className={s.input_label_container}>
            <p className={s.input_label}>Enter your wallet address</p>
            <p className={s.input_description}>
              to generate a link to receive donations
            </p>
          </div>
          <div className={s.input_group}>
            <Input
              name="address"
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
        {
          success && <>
            <p className={s.succes_text}>{`You have successfully donated ${sum} tokens`}</p>
            <Button onClick={() => push('/donation-app')}>Make own donation link</Button>
          </>
        }
      </div>
      <Footer />
    </Layout>
  );
});

export default DonateViaLink;

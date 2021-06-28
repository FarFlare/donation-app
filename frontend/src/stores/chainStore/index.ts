import { makeAutoObservable } from "mobx";
import Web3 from "web3";

import Distributor from "../../../../onchain/build/contracts/Distributor.json";

const CONTRACT_ADDRESS = "0x91e9D25135fa1E414B4c49Ab89f9d823975EfF67";

class ChainStore {
  constructor() {
    makeAutoObservable(this);
  }

  address = "";
  distributorContract!: any;
  connected = false;
  web3Loading = true;

  loadWeb3 = async (): Promise<void> => {
    try {
      this.web3Loading = true;
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        this.connected = true;
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        this.connected = true;
      } else {
        
      }
    } catch (error) {
      this.web3Loading = false;
      throw error;
    }
  };

  loadBlockChain = async (): Promise<void> => {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();

    this.address = accounts[0];

    const abi = Distributor.abi;
    // @ts-ignore
    if (abi) {
      // @ts-ignore
      const distributorContract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
      this.distributorContract = distributorContract;
    }
  };
}

export default new ChainStore();

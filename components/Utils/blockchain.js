import { ethers } from 'ethers';
import Router from 'next/router';
import { TheData } from '../../data/data';

const r = {
  usdtContractAddr: TheData.usdtContractAddr,
  smrt16ContractAddr: TheData.smrt16ContractAddr,
  matic:"",
  smrt16:"",
  usdt:"",
  pcontract:"",
  addr:""
};

const networksMap = {
    POLYGON_MAINNET: {
      chainId: '0x89',
      chainName: "Matic(Polygon) Mainnet", 
      nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
      rpcUrls: ["https://polygon-rpc.com"],
      blockExplorerUrls: ["https://www.polygonscan.com/"],
    },
    MUMBAI_TESTNET: {
      chainId: '0x13881',
      chainName: "Matic(Polygon) Mumbai Testnet",
      nativeCurrency: { name: "tMATIC", symbol: "tMATIC", decimals: 18 },
      rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
      blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
    },
  };

export const addPolygon = async (e)=> {
    e.preventDefault();
    try {
        const result = await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [networksMap.POLYGON_MAINNET],
        });
        Router.reload(window.location.pathname);
    } catch(e) {
      console.log("addPolygon",e);
    }
  };

export const addSMRT16 = async (e)=> {
    e.preventDefault();
    try {
      const result = await ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: TheData.smrt16ContractAddr, // The address that the token is at.
            symbol: "S16", // A ticker symbol or shorthand, up to 5 chars.
            decimals: 6, // The number of decimals in the token
            //image: tokenImage, // A string url of the token logo
          },
        },
      });
      console.log("addSMRT16",result);
    } catch(e) {
      console.log("addSMRT16",e);
    }
  };  

export const addUSDT = async (e)=> {
    e.preventDefault();
    try {
        const result = await ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20', // Initially only supports ERC20, but eventually more!
            options: {
              address: TheData.usdtContractAddr, // The address that the token is at.
              symbol: "USDT", // A ticker symbol or shorthand, up to 5 chars.
              decimals: 6, // The number of decimals in the token
              //image: tokenImage, // A string url of the token logo
            },
          },
        });
      console.log("addUSDT",result);
    } catch(e) {
      console.log("addUSDT",e);
    }
  };

export const getBalances = async ()=> {
  if(r.provider) {
    r.usdtDecimals = await r.contractUSDT.decimals();
    r.usdtBalance = await r.contractUSDT.balanceOf(r.addr);
    r.usdt = ethers.utils.formatUnits(r.usdtBalance, r.usdtDecimals);


    r.smrtDecimals = await r.contractSMRT.decimals();
    r.smrtBalance = await r.contractSMRT.balanceOf(r.addr);
    
    r.smrt16 = ethers.utils.formatUnits(r.smrtBalance, r.smrtDecimals);

    const balance = await r.provider.getBalance(r.addr)
    r.matic = ethers.utils.formatEther(balance)
    return {matic:r.matic, smrt16:r.smrt16, usdt:r.usdt};
  }
  return false;
}

export const isItMyPage = (id) => {
  console.log("isItMyPage",id,r.addr)
  return (''+id).toLocaleLowerCase() == r.addr.to;
}

export const readBlockchain = (callback, idx) => {
  const { ethereum } = window;
  console.log("metamaskRoutines readBlockchain idx", idx);
  
  // TODO: https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider
  
  if(!!ethereum) {
    console.log("readBlockchain !!ethereum");
    if(ethereum.networkVersion != 137) {
      console.log("readBlockchain ethereum.networkVersion != 137");
      // sw means need to switch the network!
      r.sw = true;
      callback(r,TheData.PolygonNotConnected);
    } else {
      console.log("readBlockchain ethereum.networkVersion == 137");
      ethereum.request({ method: 'eth_requestAccounts' }).then(async (accounts)=>{
        console.log('accounts', accounts, ethereum.networkVersion);
        r.addr = accounts[0];
        r.provider = new ethers.providers.Web3Provider(ethereum, "any");
        

        r.signer = r.provider.getSigner();

        r.contractUSDT = new ethers.Contract(r.usdtContractAddr, TheData.abiUSDT, r.signer);
        r.contractSMRT = new ethers.Contract(r.smrt16ContractAddr, TheData.abiSMRT, r.signer);

        



        if(idx) {
          r.smrtBalanceIdx = await r.contractSMRT.balanceOf(idx);
          r.smrt16Idx = ethers.utils.formatUnits(r.smrtBalanceIdx, r.smrtDecimals);
        }
        
        getBalances();

        

        
        r.owner = await r.contractSMRT.owner();
        r.pcontract = await r.contractSMRT.getPersonalContractAddress();
        if(r.pcontract!='0x0000000000000000000000000000000000000000') {
          //r.privateSMRT = new ethers.Contract(r.pcontract, TheData.abiPersonal, r.signer);
          r.referrer = await r.contractSMRT.referrerOf(r.addr);
        } else {
          r.referrer = '';
        }
        
        r.can = +r.smrt16Idx>0;
        console.log('return r and null no-error');
        callback(r, null);

      }).catch((err) => {
        console.log("readBlockchain catch",err);
        if (err.code === -32603) {
          console.log('something stupid');
        } else if (err.code === -32002) {
          callback(r, "Please, login to your MetaMask wallet! Check if there is a pending notofications.");
          console.log("Please, login to your MetaMask Wallet.",err)
        } else if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log('maybe connect to MetaMask?');
        } else {
          callback(r, "Blockchain communication error. "+err.message);
        }
        

      });

    }// end if else ethereum.networkVersion

  }// end if !! ethereum
};
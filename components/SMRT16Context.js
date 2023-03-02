import { ethers } from "ethers";
import _ from "lodash";
import React, { useEffect, useReducer } from "react";
import { TheData } from "../data/data";

export const SMRT16Context = React.createContext();

export function SMRT16Provider ({children}) {

    const getMisc = async (r)=> {
        if(r.provider) {
            try {
                r.owner = await r.contractSMRT.owner();
                r.pcontract = await r.contractSMRT.getPersonalContractAddress();
                if(r.pcontract!='0x0000000000000000000000000000000000000000') {
                    r.referrer = await r.contractSMRT.referrerOf(r.addr);
                } else {
                    r.referrer = '';
                }
                console.log("got misc", r);
                dispatch(r);
                return true;
            } catch(exgmisc) {
                console.log('exgmisc',exgmisc);
                //r.errors .push(exgmisc);
            }
        }
        return false;
    }

    const getBalances = async (r)=> {
        if(r.provider) {
            try {
                r.usdtDecimals = await r.contractUSDT.decimals();
                r.usdtBalance = await r.contractUSDT.balanceOf(r.addr);
                r.usdt = ethers.utils.formatUnits(r.usdtBalance, r.usdtDecimals);
            } catch(exusdt) {
                console.log("exusdt",exusdt);
                //r.errors .push(exusdt);
            }
          
            try {
                r.smrtDecimals = await r.contractSMRT.decimals();
                r.smrtBalance = await r.contractSMRT.balanceOf(r.addr);
                r.smrt16 = ethers.utils.formatUnits(r.smrtBalance, r.smrtDecimals);
            } catch (exsmrt) {
                console.log("exsmrt",exsmrt);
                //r.errors .push(exsmrt);
            }
            try {
                const balance = await r.provider.getBalance(r.addr)
                r.matic = ethers.utils.formatEther(balance)
            } catch (exmatic) {
                console.log("exmatic",exmatic);
                //r.errors .push(exmatic);
            }

            try {
                r.owner = await r.contractSMRT.owner();
                r.pcontract = await r.contractSMRT.getPersonalContractAddress();
                if(r.pcontract!='0x0000000000000000000000000000000000000000') {
                    r.referrer = await r.contractSMRT.referrerOf(r.addr);
                } else {
                    r.referrer = '';
                }
            } catch(exmisc) {
                console.log("exmisc",exmisc);
                //r.errors .push(exmisc);
            }
          console.log("got balances", r);
          dispatch(r);
        //   dispatch({...r,matic:r.matic, smrt16:r.smrt16, usdt:r.usdt});
          return true;
        }
        return false;
    }

    const reducer = (state, a) => {

        const r = {...state,...a};
        //console.log("action", a, r);
        
        if(a){
            if("error"==a.error) {
                if("CALL_EXCEPTION"==a.code) {
                    console.log("CALL_EXCEPTION",a);
                    return state;
                }
                state.errors.push(a);
                state.errors = _.uniqWith(state.errors, _.isEqual);
                console.log("add error state is:",state.errors);
                return {...state};
            }
            if("dismiss"==a.error) {
                state.errors = _.filter(state.errors, function(x) { return !_.isEqual(x, a.item) });
                console.log("remove error state is:",state.errors,a.item);
                return {...state};
            }
            if("update"==a.balance ) {
                getBalances(state);
            }
        } 
        r.isMyPage = (''+r.addr).toLocaleLowerCase()==(r.id+'').toLocaleLowerCase();
        //console.log("reducer",r);
        return r;
    } 


    const [bdata, dispatch] = useReducer(reducer,{
        errors:[],
        usdtContractAddr: TheData.usdtContractAddr,
        smrt16ContractAddr: TheData.smrt16ContractAddr,
    }); 


    const handleAccountsChanged = (accounts)=> {
        const r = bdata;
        if (accounts.length === 0) {
            dispatch({reason:'MetaMask is locked or the user has not connected any accounts',error:"error"});
        } else if (accounts[0] !== r.addr) {
            r.isPolygon = window.ethereum.networkVersion == 137;
            r.addr = accounts[0];
            r.isMyPage = (''+r.addr).toLocaleLowerCase()==(r.id+'').toLocaleLowerCase();
            //console.log("-----------eth_accounts update",r.isMyPage,r.addr,r.id);
            r.provider = new ethers.providers.Web3Provider(ethereum, "any");
            r.signer = r.provider.getSigner();
            r.contractUSDT = new ethers.Contract(r.usdtContractAddr, TheData.abiUSDT, r.signer);
            r.contractSMRT = new ethers.Contract(r.smrt16ContractAddr, TheData.abiSMRT, r.signer);
            console.log('Finished with ethereum update');
            
            getBalances(r).then(()=>{
                getMisc(r);
            });
        }
        dispatch(r);
      }


    useEffect(()=>{
        const r = bdata;
        if(!r.ethereum) {
            if(window && window.ethereum) {
                r.ethereum = window.ethereum;
                //console.log("ethereum found",window.ethereum.networkVersion);
                r.isPolygon = window.ethereum.networkVersion == 137;
                r.ethereum.request({ method: 'eth_chainId' }).then((chainId)=>{
                    console.log("method: 'eth_chainId'",chainId);
                    r.ethereum.on('chainChanged', (_chainId) => window.location.reload());
                }).catch((eth_chainIderror)=>{
                    console.log('eth_chainId',eth_chainIderror);
                    // r.errors .push(error);
                    // dispatch(null);
                });
                

                r.ethereum.request({ method: 'eth_requestAccounts' })
                    .then(handleAccountsChanged)
                    .catch((error)=>{
                        console.log('r.ethereum.request',error);
                        // r.errors .push(error);
                        // dispatch(null);
                    });
                r.ethereum.on('accountsChanged', handleAccountsChanged);
            } else {
                console.log("Ethereum not found");
                dispatch({error:"error",reason:'Please, connect to MetaMask'});
                r.myPageBtnMsg = 'Please, connect to MetaMask';
            }
        } 

    },[]);

    return (
        <SMRT16Context.Provider value={{r:bdata,SMRT16dispatch:dispatch}}>
            {children}
        </SMRT16Context.Provider>
    );

}
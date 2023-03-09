import { ethers } from "ethers";
import _ from "lodash";
import React, { useEffect, useReducer } from "react";
import { TheData } from "../data/data";
import { configureChains } from '@wagmi/core'
import { polygon } from '@wagmi/core/chains'
import { publicProvider } from '@wagmi/core/providers/public'
import { alchemyProvider } from '@wagmi/core/providers/alchemy'
import { createClient, WagmiConfig } from "wagmi";


export const SMRT16Context = React.createContext();
const alchemyKey = process.env.ALCHEMY_ID;
const initialData = {
    errors: [],
    usdtContractAddr: TheData.usdtContractAddr,
    smrt16ContractAddr: TheData.smrt16ContractAddr,
};

/**
 * Loads and keeps Ethereum context data
 */
export function SMRT16Provider({ children }) {

    const { provider } = configureChains(
        [polygon],
        [
            alchemyProvider({ apiKey: alchemyKey, priority: 1 }),
            publicProvider({ priority: 0 }),
        ],
    )

    const client1 = createClient({
        autoConnect: true,
        provider,
    })




    const getMisc = async (r) => {
        if (r.provider) {
            try {
                r.owner = await r.contractSMRT.owner();
                r.pcontract = await r.contractSMRT.getPersonalContractAddress();
                if (r.pcontract != '0x0000000000000000000000000000000000000000') {
                    r.referrer = await r.contractSMRT.referrerOf(r.addr);
                } else {
                    r.referrer = '';
                }
                console.log("got misc", r);
                dispatch(r);
                return true;
            } catch (exgmisc) {
                console.log('exgmisc', exgmisc);
                //r.errors .push(exgmisc);
            }
        }
        return false;
    }

    /**
     * Reads balances of: USDT, MATIC and SMRT16 into the context
     */
    const getBalances = async (r) => {
        if (r.provider) {
            // USDT
            try {
                r.usdtDecimals = await r.contractUSDT.decimals();
                r.usdtBalance = await r.contractUSDT.balanceOf(r.addr);
                r.usdt = ethers.utils.formatUnits(r.usdtBalance, r.usdtDecimals);
            } catch (exusdt) {
                console.log("exusdt", exusdt);
                //r.errors .push(exusdt);
            }
            //SMRT16
            try {
                r.smrtDecimals = await r.contractSMRT.decimals();
                r.smrtBalance = await r.contractSMRT.balanceOf(r.addr);
                r.smrt16 = ethers.utils.formatUnits(r.smrtBalance, r.smrtDecimals);
            } catch (exsmrt) {
                console.log("exsmrt", exsmrt);
                //r.errors .push(exsmrt);
            }
            // MATIC
            try {
                const balance = await r.provider.getBalance(r.addr)
                r.matic = ethers.utils.formatEther(balance)
            } catch (exmatic) {
                console.log("exmatic", exmatic);
                //r.errors .push(exmatic);
            }
            // TODO: check if we need this data
            try {
                r.owner = await r.contractSMRT.owner();
                r.pcontract = await r.contractSMRT.getPersonalContractAddress();
                if (r.pcontract != '0x0000000000000000000000000000000000000000') {
                    r.referrer = await r.contractSMRT.referrerOf(r.addr);
                } else {
                    r.referrer = '';
                }
            } catch (exmisc) {
                console.log("exmisc", exmisc);
                //r.errors .push(exmisc);
            }
            console.log("got balances", r);
            dispatch(r);
            return true;
        }
        return false;
    }

    const whenConnect = (ethereum) => {
        console.log("provider",provider,window.ethereum);
        const r = initialData;
        r.ethereum = ethereum;
        //console.log("ethereum found",window.ethereum.networkVersion);
        r.isPolygon = window.ethereum.networkVersion == 137;
        r.ethereum.request({ method: 'eth_chainId' }).then((chainId) => {
            console.log("method: 'eth_chainId'", chainId);
            r.ethereum.on('chainChanged', (_chainId) => window.location.reload());
        }).catch((eth_chainIderror) => {
            console.log('eth_chainId', eth_chainIderror);
            // r.errors .push(error);
            // dispatch(null);
        });


        r.ethereum.request({ method: 'eth_requestAccounts' })
            .then(handleAccountsChanged)
            .catch((error) => {
                console.log('r.ethereum.request', error);
                // r.errors .push(error);
                // dispatch(null);
            });
        r.ethereum.on('accountsChanged', handleAccountsChanged);
    }



    const handleAccountsChanged = (accounts) => {
        const r = initialData;
        if (accounts.length === 0) {
            dispatch({ reason: 'MetaMask is locked or the user has not connected any accounts', error: "error" });
        } else if (accounts[0] !== r.addr) {
            r.isPolygon = window.ethereum.networkVersion == 137;
            r.addr = accounts[0];
            r.isMyPage = ('' + r.addr).toLocaleLowerCase() == (r.id + '').toLocaleLowerCase();
            //console.log("-----------eth_accounts update",r.isMyPage,r.addr,r.id);
            r.provider = new ethers.providers.Web3Provider(ethereum, "any");
            r.signer = r.provider.getSigner();
            r.contractUSDT = new ethers.Contract(r.usdtContractAddr, TheData.abiUSDT, r.signer);
            r.contractSMRT = new ethers.Contract(r.smrt16ContractAddr, TheData.abiSMRT, r.signer);
            console.log('Finished with ethereum update');

            getBalances(r).then(() => {
                getMisc(r);
            });
        }
        dispatch(r);
    }


    const reducer = (state, a) => {

        const r = { ...state, ...a };
        console.log("action", a, r);

        if (a) {
            if ("error" == a.error) {
                if ("CALL_EXCEPTION" == a.code) {
                    console.log("CALL_EXCEPTION", a);
                    return state;
                }
                state.errors.push(a);
                state.errors = _.uniqWith(state.errors, _.isEqual);
                console.log("add error state is:", state.errors);
                return { ...state };
            }
            if ("dismiss" == a.error) {
                state.errors = _.filter(state.errors, function (x) { return !_.isEqual(x, a.item) });
                console.log("remove error state is:", state.errors, a.item);
                return { ...state };
            }
            if ("update" == a.balance) {
                getBalances(state);
            }
            if ("connect" == a.reason) {
                whenConnect(a.ethereum);
            }
        }
        r.isMyPage = ('' + r.addr).toLocaleLowerCase() == (r.id + '').toLocaleLowerCase();
        //console.log("reducer",r);
        return r;
    }


    const [bdata, dispatch] = useReducer(reducer, initialData);
   

    /*
        useEffect(() => {
            const r = bdata;
            if (!r.ethereum) {
                if (window && window.ethereum) {
                    whenEthereum(window.ethereum);
                } else {
                    console.log("Ethereum not found");
                    dispatch({ error: "error", reason: 'Please, connect to MetaMask' });
                    r.myPageBtnMsg = 'Please, connect to MetaMask';
                }
            }
    
        }, []);
    //*/
    return (
        <WagmiConfig client={client1}>

                <SMRT16Context.Provider value={{ r: bdata, SMRT16dispatch: dispatch }}>
                    {children}
                </SMRT16Context.Provider>

        </WagmiConfig>

    );

}
export const TheData = {
  "version":"0.41",

    "projInfo":{

        "diclimer":`
        This smrt16.com website has been created to provide information about the smart contracts developed and the decentralized application combined into a single project called SMRT16. 
        All the functions are available "as is" and no investment advice should be found here.`,

        "diclimerBottomline":
        "SMRT16 is a decentralized program that operates on the blockchain, it is not a legal entity, and it is not an investment project. It is a smart contract-based affiliate program. The smart contract is a self-executing digital contract that is stored on the blockchain. This means that it operates automatically, without the need for intermediaries or human management, and it guarantees that the terms of the contract will be executed as programmed. It is a way for users to earn rewards for promoting and bringing new users to the program through a referral system. As a smart contract-based program, SMRT16 operates transparently and securely on the blockchain, allowing users to have full control over their participation in the program and their earned rewards.",

        "matter":"Decentralization Matters",


        "whatis":
        "SMRT16 is an ERC-20 token running in Polygon. This website is Decentralised App (DApp) of the token sale with multi-level referral program built into the smart contract.",

        "theidea":
        `
 You may be interested in purchasing SMRT16 due to the properties of this token.


 SMRT16 implements a decentralized idea that operates exclusively on-chain without external management involvement.
        `,

        "thegoal":
        `The project's objective is to get people's attention, which will then be capitalized on for ongoing financial advantage for the project's investors.
        SMRT16 generates its funding from token sales, rewarding participants through marketing bonuses. 
        `,
        //"The goal of the project is to raise the people's attention which later will be monetized for the long lasting profit again back for investors of the project.",

        "marketing":"SMRT16 Marketing",
        "marketingthing":
        "The big thing about SMRT16 is decentralization of marketing which is built in the token sale.",

        "bonuses":
        "The funds from the token sale are instantly paid back to the project participants as marketing bonuses.",

        "howitworks": `
        It works as follows: everyone who has ever bought a SMRT16 token through a DApp or directly using the functions of a smart contract becomes a project partner. 
        It is impossible to buy tokens without specifying a referrer. After the purchase, your wallet address becomes your referral code at the same time. 
        And if you add smrt16.com/ and your wallet address, you get your referral link, for example: smrt16.com/0x5c580f5b34f7f7df64f5336f038c8705014a51ee.

        Thus, you become an agent of the project and now you can invite other people to buy SMRT16 tokens. For you - a four-level referral system, in which up to 93.75% of the transaction value is distributed among users directly involved in the transaction. Instant payment of referral bonuses occurs automatically and is guaranteed by a smart contract code on the blockchain.

        The general rule is that each next level of referral bonus has half the amount of bonuses of the previous level, therefore:

        Referral reward of the 1st level is 50% or 1/2 of the deal.
        Referral reward of the 2nd level is 25% or 1/4 of the transaction.
        Level 3 referral reward is 12.5% or 1/8 of the deal.
        Level 4 referral reward is 6.25% or 1/16 of the transaction.


Partners of the SMTR16 project are highly motivated to engage in marketing - after all, referral bonuses are paid instantly. But let's say a user wants to invest, get a few referrals, and then switch to something else. And what? His referral program is not going anywhere. It will work for a year or two and always make a profit, as long as the smart contract on the blockchain works.

        `,

        "instantly":"Note: everything paid in ETH instantly.",

        "alltogather":"All together it makes that 15/16 of the token price are spent to pay for the marketing efforts of the project investors.",

        "remaining":"The remaining 1/16 of the token price, together with any other incomes goes to the contract creator",

        "learnmarketing":"Learn more about the marketing built into SMRT16 smart contract"

    },
    "sellerInfo":{},
    "salesInfo":{},
    abiUSDT : [{
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },          {
        "inputs": [],
        "name": "decimals",
        "outputs": [
          {
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }],
    abiSMRT : [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "spender",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "approve",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "balanceOf",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "buyer",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "referrer",
              "type": "address"
            }
          ],
          "name": "buyFor",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },

        {
          "inputs": [],
          "name": "decimals",
          "outputs": [
            {
              "internalType": "uint8",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getPersonalContractAddress",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "getPersonalContractAddressOf",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "contractAddres",
              "type": "address"
            }
          ],
          "name": "getWalletOf",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "name",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "referrerOf",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
              {
                  "name": "_owner",
                  "type": "address"
              },
              {
                  "name": "_spender",
                  "type": "address"
              }
          ],
          "name": "allowance",
          "outputs": [
              {
                  "name": "",
                  "type": "uint256"
              }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "symbol",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "totalSupply",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "transfer",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "transferFrom",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
    ],
    "abiPersonal": [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "referrer_",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "smrt16_",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "addr",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "ref",
            "type": "address"
          }
        ],
        "name": "CreatedSMRT16Personal",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "buy",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "referrer",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ],
    usdtContractAddr: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    smrt16ContractAddr: "0x1b605dEaEDC71f1A764E572b1ca68B5060978753",
    siteBase: "https://smrt16.com/",
    txScan: "https://polygonscan.com/tx/",
    addrScan: "https://polygonscan.com/address/",
    "APIgetWalletTokenTransfers":"https://us-central1-smrt16-d1904.cloudfunctions.net/s/walletTokenTransfers/",
    "APIgetLast0":"https://us-central1-smrt16-d1904.cloudfunctions.net/s/getLast0?me=",
    "APIuser":"https://us-central1-smrt16-d1904.cloudfunctions.net/s/user/",
    "APIfaq":"https://us-central1-smrt16-d1904.cloudfunctions.net/s/faq",
    defaultAmountToBuy:100,
};

export const fetcher = (url) => fetch(url).then((res) => res.json());
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json(
    [
      {
        "id": "smartcontract",
        "answer": "Smart contracts are simply programs stored on a blockchain that run when predetermined conditions are met. They typically are used to automate the execution of an agreement so that all    participants can be immediately certain of the outcome, without any intermediary’s involvement or time loss. They can also automate a workflow, triggering the next action when conditions are met.",
        "question": "What is Smart Contract?",
        "key": "smartcontract"
      },
      {
        "answer": "Tether (USDT) is a popular stablecoin that crypto enthusiasts have used for years to leverage their cryptocurrency trades. Tether aims to provide a “safe” digital asset that maintains a stable valuation.    The idea is that 1 Tether can always be traded for $1, regardless of market conditions.",
        "id": "usdt",
        "question": "What is USDT?",
        "key": "usdt"
      },
      {
        "answer": "Technically, there is no limit on the number of tokens that can be bought. You will need tokens in order to receive your referral bonuses. Firstly, there is a rule that you can get the full reward with the same or more tokens on your balance. For example, in order to receive the full corresponding reward from $100, you need to have 100 SMRT16 tokens on your balance. Secondly, your tokens are burned in the amount of 1/16 of the amount of USDT that you received. For example, if you received $160, then you have 10 less tokens.",
        "question": "How much SMRT16 tokens do I need?",
        "id": "smrt16amount",
        "key": "smrt16amount"
      },
      {
        "answer": "Decentralized applications (Dapp) are a piece of software which communicates with the blockchain,    that manages the state of all network. The interface of the decentralized applications does not look    different than any website. The smart contract represents the logic of a decentralized application.    Smart contracts are integral building blocks of blockchains, which process information from external    sensors or events and help the blockchain to manage the state of all network actors.",
        "id": "dapp",
        "question": "What is dApp?",
        "key": "dapp"
      },
      {
        "answer": "SMRT16 is an ERC-20 token running in Polygon. This website is Decentralised App (DApp) of the token sale with multi-level referral program built into the smart contract. And actually, you are welcome to clone this website if you need it to develop you affiliate structure. Please, ask developers for the assistance in case you are interested. ",
        "id": "smrt16com",
        "question": "What is smrt16.com",
        "key": "smrt16com"
      },
      {
        "question": "How does SMRT16 referral program work?",
        "id": "smrt16work",
        "answer": "The referral program of SMRT16 tokens is executed inside the smart contract of the token, which guarantees trouble-free and immediate execution of transactions with referral payments. In fact, the exchange of USDT tokens for SMRT16 and the payment of referral bonuses is one transaction. Direct purchase of SMRT16 token through your link equals 50% or 1/2 op of the purchase amount. But on the condition that your balance has the same or more tokens than the amount that your referral buyer purchases in this transaction. Your referral's referral, or in other words, the 2nd level referral will bring you 25% or 1/4, the third level - 12.5% or 1/8, the 4th level - 6.25% or 1/16.",
        "key": "smrt16work"
      },
      {
        "id": "whatsref",
        "question": "What is the essence of the referral program?",
        "answer": "A referral program is a type of affiliate program, a fairly popular way to make money on the Internet, in which the partner receives a certain reward (this can be discounts, a percentage of sales, etc.) for helping to sell goods and services, as well as for attracting new customers, which are also called \"referrals\".  There are different affiliate programs.  One level — the referrer independently invites a person and receives a reward if the client follows the link. Under this condition, the partner can have as many referrals as he likes. Several levels - the partner receives a reward not only for self-invited referrals, but also for those who have already invited new customers. That is, the referral invites a person, he calls another, and for both they pay a reward to the partner. SMRT16 has four levels of referral program.",
        "key": "whatsRef"
      }
    ]
  )
}

![SMRT16 LOGO](https://firebasestorage.googleapis.com/v0/b/smrt16-d1904.appspot.com/o/smrt16-with-text-logo.png?alt=media&token=f97b41f2-a1ff-48d1-8c9c-4aea8b64bd42)
SMRT16 **Decentralized Unmanaged Organization**.

# SMRT16.com DApp

It's NextJS web app which communicates to smart contract on Polygon network > *SMRT16 which is live on Polygon blockchain mainnet 0x1b605deaedc71f1a764e572b1ca68b5060978753*
> [Read the code of the Smart Contract on PolygonScan](https://polygonscan.com/address/0x1b605deaedc71f1a764e572b1ca68b5060978753#code)

## Briefly how it  works

This is a Solidity code for an Ethereum smart contract written in the ERC20 token standard. The contract implements the SMRT16 token, which is a referral bonus token. The contract inherits the ERC20 interface and Ownable contract for token functionality and owner management.

The contract has a constructor that initializes the _usd token address and creates a pre-mint of 16 million tokens. The _referrers mapping is used to keep track of the referrers of the buyers. The Purchased event is triggered every time a buyer buys tokens with a referrer.

The contract has several functions, including:

* mint: Only the owner can mint tokens.
* buyFor: This function is called by a buyer to buy S16 tokens. The referrer is specified in the function call.
* _setReferrer: sets the referrer who will receive the referral bonuses.
* _payBonuses: calculates and distributes the referral bonuses to the referrers up to the 4th level.
* _min: returns the minimum value between two values.
* _burn: burns a specified amount of tokens.
* referrerOf: returns the referrer of a buyer.
* _createPersonalContract: creates a personal contract for a buyer.

This code implements a referral bonus system that rewards buyers for bringing new buyers to the platform. The system calculates bonuses based on the number of referrers and the amount of tokens purchased. The bonuses are paid in the _usd token and a small fee is burned in the process.

**More details you can find on** https://smrt16.com

# You can 
## Copy this website and start it for free

In case if you like to start this app localized in your country or redesign it so it fit better your auditory, yo uare free to fork this repo, apply your modofications and host anywhere anyhow.

### How to do it with https://vercel.com

1. Have an account on Vercel: To start using Vercel, you need to create an account by signing up on the website.

2. Have an account on GitHub: Similarly, you need a GitHub account to fork the repository.

3. Fork this repo: Forking the repository means creating a copy of the original repository in your GitHub account. This allows you to make changes to the code and collaborate with others.

4. Vercel - Deploy: After forking the repository, go to Vercel, click on "Import Project," and select the repository you just forked. This will automatically deploy the website to a Vercel URL.

5. Vercel - Configure: You can configure various settings related to the website, such as environment variables and build settings.

6. Vercel - Assign a Domain: You can assign a custom domain to your website by going to the "Domains" section in the Vercel dashboard.

7. Make Changes: Collaborators can now make changes to the code and submit pull requests to the original repository.

8. Collaborate: All collaborators can make changes and contribute to the development of the website. Vercel makes it easy to collaborate and manage multiple versions of the website.

If you need it even more detailed: https://telegra.ph/Step-by-Step-Guide-to-Deploying-a-GitHub-Repository-on-Vercel-02-02 

### Why Vercel?

There are many great things about Vercel. First of all, it offers a very generous free tier, so you can easily get your projects started and only pay when you have more users and start earning on it. The free tier offers unlimited websites, APIs and more. You can see the limits here.

What’s more, Vercel provides a lot of starting templates for many popular frameworks, automated builds and deployments, separate environments for staging and production, serverless functions, CDN and more. For the full list of what Vercel offers, check out their documentation. Now, it’s time to set up a Vercel account.


# Roadmap

## In Tech

1. Improve "Transaction list" section.
2. Make a page showing structures and statistics.
3. Change "My Page" button to "Connect wallet"
4. Make it to be easy to translate
5. Create documentation
~~6. Add linter~~
7. Add tests
8. Redesign FAQ
9. Redesign Buy Token Widget
10. Submit the app to https://dappradar.com/dashboard/submit-dapp
11. Allow to continue dropped transactions
12. Add buy [USDT](https://tether.to/) and [MATICs](https://polygon.technology/) buttons
13. Develop a mobile app
14. Allow built-in wallet (for those who don't want MetaMask)
15. Make a better guid of how to fork and deploy this project to Vercel (https://www.telerik.com/blogs/how-to-deploy-react-app-vercel-github)
16. Maybe https://get.venly.io/business widget wallet integration
17. Add "How it works" section
   


## Marketing

1. Offer exclusive content or early access to the project for bloggers who participate in the referral program.

2. Encourage bloggers to create content about the token sale and the referral program, such as blog posts, videos, and podcasts.

3. Create a leaderboard or contest for bloggers to increase competition and engagement.

4. Offer a dedicated support team or resource center for bloggers who have questions or need help promoting the referral program.

5. Highlight successful bloggers who have participated in the referral program to show the potential for earning money and being a part of something big.

6. Give an opportunity for Bloggers to earn rewards by creating a detailed review of the project, and showcase those reviews in your website.

7. Keep in mind that all of these suggestions should be compliant with the legal requirements, and be well-crafted to match your project's vision, values and goals.



# Execute

## Getting Started

First, install dependencies:

```bash
npm i
# or
yarn
```

Now can run the development server:

```bash
npm run dev
# or
yarn dev
```

See: http://localhost:3000

## Production build

```bash
npm run build
# or
yarn build
```


### If you want static export

```bash
npm run export
# or
yarn export
```


## Contacts

  dev@smrt16.com

  admin@smrt16.com

  https://t.me/smrt16 

  
## License 

### [MIT](https://opensource.org/licenses/MIT)

Copyright 2023 smrt16.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


# Terms of Service

Available at https://github.com/SMRT16/smrt16.com/blob/master/TERMS.md 

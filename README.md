## Introduction

Welcome to our zk voting application! This application allows users to securely and anonymously vote on various proposals using zero-knowledge proofs. Leveraging the power of our products, including Truffle, MetaMask, ZKEVM, and Infura, we have created a robust and user-friendly voting platform that ensures the privacy and integrity of each vote.


## Pre-requisites

- [Node.js latest version](https://nodejs.org/en/download/)
- [Truffle installed globally](https://www.trufflesuite.com/truffle)
- [MetaMask Flask](https://metamask.io/flask/)
- [Infura account](https://infura.io/)
- [Zokrates installed globally](https://zokrates.github.io/gettingstarted.html)


## Setup

1. Clone the repository

```
git clone git@github.com:ConsenSys/zk-vote.git
```

2. Install dependencies

```
cd zk-vote
npm install
```

3. Grab your Infura API key and your Flask mnemonic phrase from MetaMask. Add them to a new file called `.env` in the [votes package](packages/vote/). There is an example file in the same directory called `.env.example`. Your `.env` file should look like this:

```
INFURA_PROJECT_ID=123
MNEMONIC="strategy venue ..."
```

4. In a first terminal, start the development blockchain

```sh
npm run network
```

5. In a second terminal, run the dev command. this will do the following:
    - Compile the contracts and compile typescript defeinitions
    - Deploy the contracts to the development blockchain
    - Start the web server

```sh
npm run dev
```

## TODO before release

- [ ] Add tests
- [ ] Add documentation
- [ ] explain CI
- [ ] explain deployment
- [ ] explain how to use the app
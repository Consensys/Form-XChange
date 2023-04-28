# FormXChange

Form XChange is an open sourced tool to create and use feedback forms on Linea. This application allows user to vote anonymously on various proposals.

Leveraging the power of our products, including Truffle, MetaMask, Linea, and Infura, we have created a robust and user-friendly voting platform that ensures the privacy and integrity of each vote.


## How It works


![Form](https://i.imgur.com/al1odgd.png)


To use FormXChange you need to connect and sign in with MetaMask Wallet. 

**If you are a Form Author/Creator:**

- You can create new forms with multiple questions
- After the user submits their responses/feedbacks you can view the average for each section

**If you are a Participant/Contributor:**

- You can submit responses to forms/proposals anonymously
- Participants can also view the results after submitting responses

#### What are the main features?

- Sign in with MetaMask
- Ability to create forms/proposals for users to submit responses anonymously
- Each questions have 5 options to provide response/feedback
- Getting the average on each sections/questions
  



## Technical Details

### Pre-requisites



| Name           | Link                                 | Text               |
| -------------- | ------------------------------------ | ------------------ |
| Nodejs         | https://nodejs.org/en/download/      | Latest Version     |
| Truffle        | https://www.trufflesuite.com/truffle | Installed Globally |
| Infura         |       https://infura.io/             |               |



### **Libraries used**

Here's an overview of the included frameworks and tools.

- **Next.js** - A frameworks fo React applications that is focused on server-rendered and minimalistic approach.
- **Typescript** - Superset of JavaScript which primarily provides optional static typing, classes and interfaces.
- **Tailwind CSS**- UI & Styling Library.
- **Turbo** - Turborepo is a high-performance build system for JavaScript and TypeScript codebases.


### Run It Locally

1. Clone the repository

```
git clone git@github.com:ConsenSys/Form-XChange.git
```

2. Install dependencies

```
cd Form-XChange
npm install
```

3. Grab your Infura API key and Add them to a new file called `.env` in the [apps/web ](https://github.com/ConsenSys/Form-XChange/tree/main/apps/web) directory.
There is an example file in the same directory called `.env.example`. Your `.env` file should look like this:


```
INFURA_PROJECT_ID=123
```


5. In a first terminal, start the development blockchain

```sh
npm run network
```

. In a second terminal, run the dev command from the `packages/form-XChange` directory. 

```sh
npm run dev
```

This will do the following:

- Compile the contracts and compile typescript defeinitions
- Deploy the contracts to the local development blockchain

Now head over to this path `apps/web/lib/contracts.ts/config.ts` and change the factory contract with the one you just deployed locally.


**Or,**

If you wish to run Linea directly:

1. You need to change directory to `packages` after that go to to [form-XChange](https://github.com/ConsenSys/Form-XChange/tree/main/packages/form-XChange) directory.
Run the following command:

```sh
npm run linea
```

This will deploy the contract on linea. You need to head over to this `apps/web/lib/contracts.ts/config.ts` file and change the factory contract for the deployed contract on linea.

In this case, you need to [bridge funds](https://docs.linea.build/use-linea/bridge-funds
) to linea. 

2. Running some tests

If you wish to run some test:

```sh
npm run test
```

---

### Known Issues ⏳

<details>
    <summary> <b>Issue: Metamask Wallet not recognized on Brave Browser</b>  </summary>
 
    
 <br/>
    
   It has brought to our attention that that the Metamask wallet is not recognized when using the Brave browser. This may result in an inability to access the wallet and create new forms or submitting feedbacks.
    
**Impact**
    
This issue may impact users who prefer to use the Brave browser for its privacy and security features. Without access to the Metamask wallet, users may need to switch to an alternative browser to use the dapp.

**Workaround**
    
If you encounter this issue, we recommend trying the following workaround:

- Open the Metamask wallet directly from the Brave browser extension icon rather than accessing it through the website or try following these [steps](https://support.metamask.io/hc/en-us/articles/360038596792-Using-MetaMask-wallet-in-Brave-browser#:~:text=If%20you%20encounter%20issues%20while,wallets%20are%20installed%20and%20active.&text=Restart%20Brave).
- If this workaround does not work, try switching to a different browser such as Chrome or Firefox.
    
**Solution**
    
Our development team is actively investigating the root cause of this issue and working on a solution. We appreciate your patience and understanding while we work to resolve this issue. 
    
</details>




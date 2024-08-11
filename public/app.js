const contractAddress = "0x2dE8485A04B73F38EC99C2dd96283C1A3d4aC4FD";  // Replace with the actual deployed contract address from Ganache
const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "lastWinner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "manager",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "players",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "enter",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [],
    "name": "pickWinner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getPlayers",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getLastWinner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];

let web3;
let lotteryContract;
let accounts;

async function init() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      accounts = await web3.eth.getAccounts();
      console.log('Connected accounts:', accounts);
    } catch (error) {
      console.error("User denied account access", error);
    }
  } else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
  } else {
    alert("Please install MetaMask to use this DApp!");
    return;
  }

  lotteryContract = new web3.eth.Contract(contractABI, contractAddress);
}

async function enterLottery() {
  try {
    if (!accounts || accounts.length === 0) {
      accounts = await web3.eth.getAccounts();
    }

    console.log('Entering lottery with account:', accounts[0]);
    const tx = await lotteryContract.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("0.02", "ether")
    });
    document.getElementById("status").innerText = "Entered the lottery!";
    console.log('Transaction hash:', tx.transactionHash);
  } catch (error) {
    console.error("Error entering lottery:", error);
  }
}

async function pickWinner() {
  try {
    if (!accounts || accounts.length === 0) {
      accounts = await web3.eth.getAccounts();
    }

    console.log('Picking winner with account:', accounts[0]);
    const tx = await lotteryContract.methods.pickWinner().send({
      from: accounts[0]
    });
    console.log('Transaction hash:', tx.transactionHash);

    const winner = await lotteryContract.methods.getLastWinner().call();
    console.log('Last winner:', winner);
    document.getElementById("status").innerText = `Winner picked! The winner is: ${winner}`;
  } catch (error) {
    console.error("Error picking winner:", error);
  }
}

window.addEventListener('load', init);

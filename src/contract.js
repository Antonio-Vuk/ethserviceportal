export const Web3 = require('web3')
// const rpcURL = 'http://127.0.0.1:7545' // Your RCP URL goes here
// //export const web3 = new Web3(rpcURL)
export const web3 = new Web3(window.web3.currentProvider)

const rpcURL = 'HTTP://127.0.0.1:7545'

const abi = [
	{
		"constant": false,
		"inputs": [],
		"name": "createService",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdraw",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
export const contractAddress = '0x7dad174105282382fc7fc61f70553f12798298c7'
export const ugovor = new web3.eth.Contract(abi, contractAddress)


const ethers = require('ethers');
const EthTx = require('ethereumjs-tx');
const Web3 = require('web3');
const Tx = require('ethereumjs-tx')

// const chainId = ChainId.MAINNET;
const chainId = 5777;
const kesAddress = '0xDc43272A6fA7EAB268f0D8748A515B540C0C4C0f';
const cusdAddress = '0x8b72E9B049335b4Fa85EFbaFd9ab753BcBbf5da5';

const url = "http://localhost:7545";
const web3 = new Web3(url);

const provider = new ethers.providers.JsonRpcProvider(url);

const config = require('./config.json');
const factoryAddress = config.factoryAddress;
const factoryAbi = config.factoryAbi;
const routerAddress = config.routerAddress;
const routerAbi = config.routerAddress;
// web3.eth.getAccounts().then(console.log);


// javascript:  query the new exchange contract address for given token contract

// let fs = require("fs");
// let Web3 = require("web3");

// var abi = '[{"name":"NewExchange","inputs":[{"type":"address","name":"token","indexed":true},{"type":"address","name":"exchange","indexed":true}],"anonymous":false,"type":"event"},{"name":"initializeFactory","outputs":[],"inputs":[{"type":"address","name":"template"}],"constant":false,"payable":false,"type":"function","gas":35725},{"name":"createExchange","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"address","name":"token"}],"constant":false,"payable":false,"type":"function","gas":187911},{"name":"getExchange","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"address","name":"token"}],"constant":true,"payable":false,"type":"function","gas":715},{"name":"getToken","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"address","name":"exchange"}],"constant":true,"payable":false,"type":"function","gas":745},{"name":"getTokenWithId","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"uint256","name":"token_id"}],"constant":true,"payable":false,"type":"function","gas":736},{"name":"exchangeTemplate","outputs":[{"type":"address","name":"out"}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":633},{"name":"tokenCount","outputs":[{"type":"uint256","name":"out"}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":663}]'

var token = '0xCC4d8eCFa6a5c1a84853EC5c0c08Cc54Cb177a6A'
var address = '0xf5D915570BC477f9B8D6C0E980aA81757A3AaC36';
const account = '0x0e364eb0ad6eb5a4fc30fc3d2c2ae8ebe75f245c';
let web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/"));
const uniswap = new web3.eth.Contract(JSON.parse(abi), address);

async function call(transaction) {
    return await transaction.call({from: account});
}

async function getTokenExchange() {
    let exchange = await call(uniswap.methods.getExchange(token));
    console.log("the exchange address for ERC20 token is:" + exchange)
}
getTokenExchange()
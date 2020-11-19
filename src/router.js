require('dotenv').config();
const Web3 = require('web3');
const web3 = new Web3(process.env.NODE_URL);
const ethers = require('ethers');
const EthTx = require('ethereumjs-tx');

const config = require('./config.json');
const Router = require('@koa/router');
const router = new Router();

const kotaniFactory = {
    factory: new web3.eth.Contract(
        config.factoryAbi,
        config.factoryAddress
    ),
    route02: new web3.eth.Contract(
        config.router02Abi,
        config.routerAddress
    )
};


router.get('/tokenBalance/:ctoken/:address', async ctx => {
    const ctoken = ctoken[ctx.params.ctoken];
    if(typeof ctoken === 'undefines'){
        ctx.status = 400;
        ctx.body = {
            error: `ctoken ${ctx.params.ctoken} does not exist`
        };
        return;
    }
    try{
    const tokenBalance = await ctoken
    .methods
    .balanceOfUnderlying(ctx.params.address)
    .call();
    ctx.body = {
        ctoken: ctx.params.ctoken,
        address: ctx.params.address,
        tokenBalance
    };
    }catch(e){
        console.log(e);
        ctx.status = 500;
        ctx.body = {
            error: `internal server error`
        }
    }
});

router.get('/', ctx => {
    ctx.body = 'hello world';
});

module.exports = router;
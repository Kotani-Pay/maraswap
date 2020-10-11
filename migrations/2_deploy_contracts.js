const Factory = artifacts.require('uniswapv2/UniswapV2Factory.sol');
const Router = artifacts.require('uniswapv2/UniswapV2Router02.sol');
const WETH = artifacts.require('WETH.sol');
const MockERC20 = artifacts.require('MockERC20.sol');
const CUSD = artifacts.require('CUSD.sol');
const KES = artifacts.require('KES.sol');
const KotaniToken = artifacts.require('KotaniToken.sol') 
const Minter = artifacts.require('Minter.sol'); 
const InvestorsVault = artifacts.require('InvestorsVault.sol');
const KotaniTreasury = artifacts.require('KotaniTreasury.sol');
const Migrator = artifacts.require('Migrator.sol');

module.exports = async function(deployer, _network, addresses) {
  const [admin, _] = addresses;

  await deployer.deploy(WETH);
  await deployer.deploy(CUSD);
  await deployer.deploy(KES);
  const weth = await WETH.deployed();
  const tokenA = await MockERC20.new('Token A', 'TKA', web3.utils.toWei('100000'));
  const tokenB = await MockERC20.new('Token B', 'TKB', web3.utils.toWei('1000'));
  const cusd = await CUSD.deployed();
  const kes = await KES.deployed();


  await deployer.deploy(Factory, admin);
  const factory = await Factory.deployed();
  await factory.createPair(weth.address, tokenA.address);
  await factory.createPair(weth.address, tokenB.address);
  await factory.createPair(cusd.address, kes.address);
  await deployer.deploy(Router, factory.address, weth.address);
  await deployer.deploy(Router, factory.address, cusd.address);
  const router = await Router.deployed();

  await deployer.deploy(KotaniToken);
  const kotaniToken = await KotaniToken.deployed();

  await deployer.deploy(
    Minter,
    kotaniToken.address,
    admin,
    web3.utils.toWei('100'),
    1,
    10
  );
  const minter = await Minter.deployed();
  await kotaniToken.transferOwnership(minter.address);

  await deployer.deploy(InvestorsVault, kotaniToken.address);
  const investorsVault = await InvestorsVault.deployed();

  await deployer.deploy(
    KotaniTreasury,
    factory.address, 
    investorsVault.address, 
    kotaniToken.address, 
    weth.address
  );
  const kotaniTreasury = await KotaniTreasury.deployed();
  await factory.setFeeTo(kotaniTreasury.address);

  await deployer.deploy(
    Migrator,
    minter.address,
    '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    factory.address,
    1
  );
};
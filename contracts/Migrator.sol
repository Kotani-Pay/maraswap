// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.6.12;

import "./kotani/interfaces/IKotaniPair.sol";
import "./kotani/interfaces/IKotaniFactory.sol";


contract Migrator {
    address public minter;
    address public oldFactory;
    IKotaniFactory public factory;
    uint256 public notBeforeBlock;
    uint256 public desiredLiquidity = uint256(-1);

    constructor(
        address _minter,
        address _oldFactory,
        IKotaniFactory _factory,
        uint256 _notBeforeBlock
    ) public {
        minter = _minter;
        oldFactory = _oldFactory;
        factory = _factory;
        notBeforeBlock = _notBeforeBlock;
    }

    function migrate(IKotaniPair orig) public returns (IKotaniPair) {
        require(msg.sender == minter, "not from minter");
        require(block.number >= notBeforeBlock, "too early to migrate");
        require(orig.factory() == oldFactory, "not from old factory");
        address token0 = orig.token0();
        address token1 = orig.token1();
        IKotaniPair pair = IKotaniPair(factory.getPair(token0, token1));
        if (pair == IKotaniPair(address(0))) {
            pair = IKotaniPair(factory.createPair(token0, token1));
        }
        uint256 lp = orig.balanceOf(msg.sender);
        if (lp == 0) return pair;
        desiredLiquidity = lp;
        orig.transferFrom(msg.sender, address(orig), lp);
        orig.burn(address(pair));
        pair.mint(msg.sender);
        desiredLiquidity = uint256(-1);
        return pair;
    }
}
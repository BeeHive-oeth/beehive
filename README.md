# BeeHive Protocol

BeeHive (site unfinished) is an on-chain options trading protocol on [Oasis Paratime](https://oasiseth.org) using Chainlink Price Feeds (currently uses a fake aggregator).

The core of the BeeHive Protocol is a system of [Solidity smart contracts](https://github.com/ethereum/solidity). The main parts of the protocol are **options contracts** and **liquidity pools contracts**. Options contracts are _Call Options Contract_ and _Put Options Contract_. Liquidity pools contracts are _OETH Pool Contract_ and _ERC Pool Contract_.


## What are Options

An option is a contract giving the buyer _the right, but not the obligation_, to buy (in the case of a call option contract) or sell (in the case of a put option contract) the underlying asset _at a specific price on or before a certain date_. Traders can use on-chain options for speculation or to hedge their positions. Options are known as _derivatives_ because they derive their value from an underlying asset. 

## How Bee Hive Protocol Works

![alt text](https://camo.githubusercontent.com/5251fcb9cc70c35ff3d148c03397d1a7e0a44c45ee325a4f23e8d844c077f374/68747470733a2f2f692e696d6775722e636f6d2f6d31536f6f78332e706e67) 

---

![alt text](https://camo.githubusercontent.com/7484b921efa54a5a79d6966d5dffd454b1d5eef3723f22cb0d1a31f82bbc6459/68747470733a2f2f692e696d6775722e636f6d2f5a7771394777782e706e67)

HiveCallOptions and HivePutOptions are options contracts. These contracts calculate `fees` (options prices), `create` new options, `exercise` options contracts on behalf of the holders and `exchange` holders' assets using [the Uniswap exchange](https://uniswap.oasiseth.org) for sending liquidity back to the pool during the process of exercising.

HiveOETHPool and HiveERCPool are liquidity pools contracts. These non-custodial contracts accumulate liquidity from providers (writers). Pooled liquidity is used for selling (writing) options contracts to the buyers (holders). After a liquidity provider calls the `provide` method, they send OETH / ERC-20 to the liquidity pool contract and receive writeOETH / writeERC (ERC20) tokens to their address. To leave the pool a liqudity provider calls the `withdraw` method, burns their writeOETH / writeERC tokens and receives OETH / ERC20 tokens to their address.

---

OETH Call Options are created and exercised via **HiveCallOptions** and **HiveOETHPool** contracts.

**OETH Call Option is an on-chain contract that gives a holder a right to swap their [DAI stablecoins](https://github.com/makerdao/dss) for [OETH](https://ethereum.org/eth/) at a fixed price during a certain period.** To activate a OETH Call Option a holder chooses the `period`, `amount` and `strike` for their option contract. After paying `fees`, the `lock` method of the HiveOETHPool contract locks OETH `strikeAmount` on the pool contract. If a holder intends to swap their DAI for OETH during a fixed period that they have paid for, they call the `exercise` method. The HiveOETHPool contract will receive holder's DAI and will send the amount of OETH that was locked on the contract for this particular holder. Calling the `exchange` method of the HiveOETHPool contract will automatically swap DAI received from the option holder for OETH at the market price using Chainlink's price aggregator. After the swap, OETH is sent back to the HiveOETHPool contract.

---

OETH Put Options are created and exercised via **HivePutOptions** and **HiveERCPool** contracts.

**OETH Put Option is an on-chain contract that gives a holder a right to swap their [OETH](https://oasiseth.org) for [DAI stablecoins](https://github.com/VenusProtocol/venus-protocol) at a fixed price during a certain period.** To activate a OETH Put Option a holder chooses the `period`, `amount` and `strike` for their option contract. After paying `fees`, the `lock` method of the HiveERCPool contract locks DAI `amount` on the pool contract. If a holder intends to swap their OETH for DAI during a fixed period that they have paid for, they call the `exercise` method. The HiveERCPool contract will receive holder's OETH and will send the amount of DAI that was locked on the contract for this particular holder. Calling the `exchange` method of the HiveERCPool contract will automatically swap OETH received from the option holder for DAI at the market price using Chainlink's price aggregator. After the swap, DAI is sent back to the HiveERCPool contract.

See below: 

    /**
     * @notice Can be used to update the contract in critical situations
     *         in the first 90 days after deployment
     */
    function transferPoolOwnership() external onlyOwner {
        require(now < contractCreationTimestamp + 90 days);
        pool.transferOwnership(owner());
    }


## Future work:

- Deployment of contracts on Paratime mainnet.
- Deployment of web UI on a public web site.
- Marketing and twitter material to bring value locked into the protocol.
- Working with the Paratime community to collaborate with other protocols and add further features to Hive.
- Governance improvements and further decentralisation work.
- Addition of further token support.

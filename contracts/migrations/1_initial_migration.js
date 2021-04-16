const BN = web3.utils.BN

const Exchange = artifacts.require("FakeExchange")
const StableCoin = artifacts.require("FakeUSD")
const PriceProvider = artifacts.require("FakePriceProvider")

const CallHedge = artifacts.require("HiveCallOptions")
const PutHedge = artifacts.require("HivePutOptions")
const OETHPool = artifacts.require("HiveOETHPool")
const ERCPool = artifacts.require("HiveERCPool")

const priceProviderSettings = {currentAnswer: new BN(200e8)}

module.exports = async function (deployer, network) {
  try {
    if (network == "development" || network == "develop") {
      await deployer.deploy(StableCoin)
      await deployer.deploy(PriceProvider, priceProviderSettings.currentAnswer)
      await deployer.deploy(Exchange, PriceProvider.address, StableCoin.address)
      await deployer.deploy(
        PutHedge,
        StableCoin.address,
        PriceProvider.address,
        Exchange.address
      )
      await deployer.deploy(CallHedge, PriceProvider.address)
    } else if (network == "main") {
      const DAI = "0x4BD17003473389A42DAF6a0a729f6Fdb328BbBd7"
      const ChainLink = "0x944B319cB0326887c39a851813186273846dAe7b"
      const Uniswap = "0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F"
      // await deployer.deploy(PutHedge, DAI, ChainLink, Uniswap)
      await deployer.deploy(CallHedge, ChainLink)
    } else throw `unsupported network ${network}`
  } catch (err) {
    console.error(err)
  }
}

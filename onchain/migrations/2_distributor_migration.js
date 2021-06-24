const Distributor = artifacts.require("Distributor")
const DonateToken = artifacts.require("DonateToken")

module.exports = function (deployer) {
  deployer.deploy(Distributor)
  deployer.link(Distributor, DonateToken)
  deployer.deploy(DonateToken)
};

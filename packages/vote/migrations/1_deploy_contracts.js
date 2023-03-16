const ConvertLib = artifacts.require("ConvertLib");
const MetaCoin = artifacts.require("MetaCoin");
const FeedbackFrom = artifacts.require("FeedbackFrom");

module.exports = function (deployer) {
  deployer.deploy(FeedbackFrom);
  deployer.deploy(ConvertLib);
  deployer.link(FeedbackFrom, ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
};
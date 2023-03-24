const FeedbackFormFactory = artifacts.require("FeedbackFormFactory");

module.exports = function (deployer) {
  deployer.deploy(FeedbackFormFactory);
};

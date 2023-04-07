const FeedbackFormFactory = artifacts.require("FeedbackFormFactory");

module.exports = async function (deployer) {
  await deployer.deploy(FeedbackFormFactory);
};

const FeedbackFormFactory = artifacts.require("FeedbackFormFactory");

module.exports = async function (deployer) {
  await deployer.deploy(FeedbackFormFactory);
  
  const feedbackFormFactory = await FeedbackFormFactory.deployed()
  // hardcoded contract from testing 
  await feedbackFormFactory.createFeedbackForm(["question 1", "question 2"]);
};

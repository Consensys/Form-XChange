const { expectRevert } = require("@openzeppelin/test-helpers");

const FeedbackFormFactory = artifacts.require("FeedbackFormFactory");
const FeedbackForm = artifacts.require("FeedbackForm");

contract("FeedbackFormFactory", () => {
  let feedbackFormFactory;

  beforeEach(async () => {
    feedbackFormFactory = await FeedbackFormFactory.new();
    await feedbackFormFactory.createFeedbackForm(questions, title, description);
  });

  const questions = ["question 1", "question 2"];
  const title = "title";
  const description = "description";

  it("should create a new Feedbackform contract", async () => {
    const feedbackForms = await feedbackFormFactory.getFeedbackForms();
    assert.equal(feedbackForms.length, 1, "Incorrect number of feedback forms");

    assert.equal(
      (await feedbackFormFactory.getAllQuestions(0)).length,
      2,
      "Incorrect number of questions"
    );

    const feedbackForm = await FeedbackForm.at(feedbackForms[0]);
    assert.equal(await feedbackForm.title(), title, "form title is wrong");
    assert.equal(
      await feedbackForm.description(),
      description,
      "form description is wrong"
    );
  });

  it("should submit the feedbacks to the form questions correctly", async () => {
    const FORM_ID = 0;
    const Q1_ANSWER = 1;
    const Q2_ANSWER = 4;

    await feedbackFormFactory.submitFeedback(FORM_ID, [Q1_ANSWER, Q2_ANSWER]);

    /**
   * await feedbackFormFactory.getAllQuestions(0) = [
      [ 'question 1', [ '1' ], value: 'question 1', feedback: [ '1' ] ],
      [ 'question 2', [ '4' ], value: 'question 2', feedback: [ '4' ] ]
      ]
   */
    const question1 = (await feedbackFormFactory.getAllQuestions(0))[0];
    const question2 = (await feedbackFormFactory.getAllQuestions(0))[1];

    assert.equal(question1[1][0], Q1_ANSWER);

    assert.equal(question2[1][0], Q2_ANSWER);
  });

  it("should revert if same user tries to submit feedback again", async () => {
    await feedbackFormFactory.submitFeedback(0, [1, 4]);
    await expectRevert(
      feedbackFormFactory.submitFeedback(0, [3, 2]),
      "User has already prvoded feedback."
    );
  });
});

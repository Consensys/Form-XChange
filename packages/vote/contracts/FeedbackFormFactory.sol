// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;
import "./FeedbackForm.sol";

contract FeedbackFormFactory {
    FeedbackForm[] public feedbackForms;

    function createFeedbackForm(string[] memory _questions) public {
        FeedbackForm feedbackForm = new FeedbackForm();
        feedbackForm.setQuestions(_questions);
        feedbackForms.push(feedbackForm);
    }

    function getFeedbackForms() public view returns (FeedbackForm[] memory) {
        return feedbackForms;
    }

    function getQuestionById(uint _index, uint _questionId) public view returns (string memory, uint[] memory) {
        return feedbackForms[_index].getQuestionById(_questionId);
    }
}
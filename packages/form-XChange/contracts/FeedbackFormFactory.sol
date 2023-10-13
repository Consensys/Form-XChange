// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;
import "./FeedbackForm.sol";

contract FeedbackFormFactory {
    FeedbackForm[] public feedbackForms;

    function createFeedbackForm(
        string[] memory _questions,
        string memory _title,
        string memory _description
    ) public returns (FeedbackForm) {
        FeedbackForm feedbackForm = new FeedbackForm(
            msg.sender,
            _title,
            _description
        );
        feedbackForm.setQuestions(_questions);
        feedbackForms.push(feedbackForm);
        return feedbackForm;
    }

    function getFeedbackForms() public view returns (FeedbackForm[] memory) {
        return feedbackForms;
    }

    function getFeedbackFormById(uint _id) public view returns (FeedbackForm) {
        return feedbackForms[_id];
    }
}

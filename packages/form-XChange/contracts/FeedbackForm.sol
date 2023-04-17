// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;

contract FeedbackForm {
    struct Question {
        string value;
        uint[] feedback;
    }

    uint private numberOfQuestions;

    address public owner;
    string public title;
    string public description;

    mapping(uint => Question) public questions;
    mapping(address => bool) public feedbackProviders;

    constructor(string memory _title, string memory _description) {
        owner = tx.origin;
        title = _title;
        description = _description;
    }

    modifier onlyOwner() {
        require(tx.origin == owner, "Only owner can call this function.");
        _;
    }

    modifier hasProvidedFeedback() {
        require(!feedbackProviders[msg.sender], "User has already prvoded feedback.");
        _;
    }

    function getHasProvidedFeedback(address _address) public view returns (bool) {
        return feedbackProviders[_address];
    }

    function setQuestions(string[] memory _questions) public onlyOwner {
        numberOfQuestions = _questions.length;
        for (uint i; i < numberOfQuestions; i++) {
            Question memory question;
            question.value = _questions[i];
            questions[i] = question;
        }
    }

    function getQuestionById(
        uint _id
    ) public view onlyOwner returns (string memory, uint[] memory) {
        return (questions[_id].value, questions[_id].feedback);
    }

    function getAllQuestions()
        public
        view
        returns (Question[] memory)
    {
        Question[] memory allQuestions = new Question[](numberOfQuestions);
        for (uint i; i < numberOfQuestions; i++) {
            allQuestions[i] = questions[i];
        }
        return allQuestions;
    }

    function submitFeedback(
        uint[] memory _feedback
    ) public hasProvidedFeedback {
        require(
            numberOfQuestions == _feedback.length,
            "Feedback should be provided for all questions."
        );
        for (uint i; i < _feedback.length; i++) {
            Question storage question = questions[i];
            question.feedback.push(_feedback[i]);
        }
        feedbackProviders[msg.sender] = true;
    }
}

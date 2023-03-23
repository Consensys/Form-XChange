// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;

// Base form contract for all forms

contract FeedbackForm {
    struct Question {
        string value;
        uint[] votes;
    }

    uint private numberOfQuestions;

    address public owner;
    string public title;
    string public description;

    mapping(uint => Question) public questions;
    mapping(address => bool) public usersVoted;

    constructor(string memory _title, string memory _description) {
        owner = tx.origin;
        title = _title;
        description = _description;
    }

    modifier onlyOwner() {
        require(tx.origin == owner, "Only owner can call this function.");
        _;
    }

    modifier userVoted() {
        require(!usersVoted[msg.sender], "User has already voted.");
        _;
    }

    function setQuestions(string[] memory _questions) public onlyOwner {
        numberOfQuestions = _questions.length;
        for (uint i; i < numberOfQuestions; i++) {
            Question memory question;
            question.value = _questions[i];
            questions[i] = question;
        }
    }

    function getQuestionById(uint _id) public view onlyOwner returns (string memory, uint[] memory) {
        return (questions[_id].value, questions[_id].votes);
    }

    function getAllQuestions() public view onlyOwner returns (string[] memory) {
        string[] memory allQuestions = new string[](numberOfQuestions);
        for (uint i; i < numberOfQuestions; i++) {
            allQuestions[i] = questions[i].value;
        }
        return allQuestions;
    }

    function setAnswers(uint[] memory _answers) public userVoted {
        require(numberOfQuestions == _answers.length, "All questions must be answered.");
            for (uint i; i < _answers.length; i++) {
                Question storage question = questions[i];
                question.votes.push(_answers[i]);
            }
            usersVoted[msg.sender] = true;
    }
}
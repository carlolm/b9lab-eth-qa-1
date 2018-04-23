pragma solidity ^0.4.0;

contract Calculator {

    uint public counter = 5;

    function add(uint input) public {
        counter = counter + input;
    }

    function increment() public { //increases counter by 1
        counter++;
    }

    function subtract(uint input) public { //decreases counter by 1
        counter = counter - input;
    }

    function multiply(uint input) public { //multiplies counter by input
        counter = counter * input;
    }

    function divide(uint input) public { //divides counter by input
        counter = counter / input;
    }

    function getCounter() public constant returns (uint) {
        return counter;
    }
}
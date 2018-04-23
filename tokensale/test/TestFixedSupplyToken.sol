pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/FixedSupplyToken.sol";

contract TestFixedSupplyToken {

  FixedSupplyToken token = FixedSupplyToken(DeployedAddresses.FixedSupplyToken());

  function testInitialSupplyUsingDeployedContract() public {

    uint expected = 1000000 * (10 ** 18);

    Assert.equal(token.totalSupply(), expected, "Total supply should equal 1000000 tokens");
  }

  function testOwnerInitialBalance() public {

    uint expected = 1000000 * (10 ** 18);

    Assert.equal(token.balanceOf(msg.sender), expected, "Token owner should have correct initial balance");
  }

  function testApprove() public {

    Assert.isTrue(token.approve(address(1), 450), "Token owner can approve transactions");
  }

}

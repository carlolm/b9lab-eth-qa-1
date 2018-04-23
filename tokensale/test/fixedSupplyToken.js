// ----------------------------------------------------------------------------
// B9Labs: Ethereum QA Engineering Course (ETH-QA-1)
// April 2018
// Carlo P. Las Marias | carlol@gmail.com
// ----------------------------------------------------------------------------

const Token = artifacts.require("./FixedSupplyToken.sol");

contract('FixedSupplyToken', async (accounts) => {

  before(() => {
    owner_account = accounts[0];
    bob_account = accounts[1];
    alice_account = accounts[2];
  });

  const totalSupply = 1e6 * (10 ** 18);

  // ----------------------------------------------------------------------------
  // ERC functions / events
  // ----------------------------------------------------------------------------

  // function totalSupply() public constant returns (uint);
  it('should create correct total supply', async () => {
    const instance = await Token.deployed();
    const _totalSupply = await instance.totalSupply.call();
    assert.equal(Number(_totalSupply), totalSupply, 'total supply is wrong');
  });

  // function balanceOf(address tokenOwner) public constant returns (uint balance);
  it('should assign all tokens to owner', async () => {
    const instance = await Token.deployed();
    const _balance = await instance.balanceOf.call(owner_account);
    assert.equal(Number(_balance), totalSupply, 'owner has the wrong initial balance');
  });

  it('should transfer correct number of tokens', async () => {
    const amount = 1 * (10 ** 18);
    const instance = await Token.deployed();

    // function transfer(address to, uint tokens) public returns (bool success);
    const transferObject = await instance.transfer(bob_account, amount);
    const ownerBalance = await instance.balanceOf.call(owner_account);
    const bobBalance = await instance.balanceOf.call(bob_account);
    assert.equal(Number(ownerBalance), totalSupply - amount, 'recipient balance is wrong');
    assert.equal(Number(bobBalance), amount, 'recipient balance is wrong');
    
    // event Transfer(address indexed from, address indexed to, uint tokens);
    const { event, args } = transferObject.logs[0];
    assert.equal(event, 'Transfer', 'wrong event logged');
    const { from, to, tokens } = args;
    assert.equal(from, owner_account, 'wrong sender');
    assert.equal(to, bob_account, 'wrong recipient');
    assert.equal(Number(tokens), amount, 'wrong amount');
  });

  // function approve(address spender, uint tokens) public returns (bool success);
  it('should allow accounts to approve transfers', async () => {
    const amount = 10 * (10 ** 18);
    const instance = await Token.deployed();
    const result = await instance.approve.call(alice_account, amount);
    assert.isTrue(result, 'approve failed');
    const approveObject = await instance.approve(alice_account, amount);

    // event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
    const { event, args } = approveObject.logs[0];
    assert.equal(event, 'Approval', 'wrong event logged');
    const { tokenOwner, spender, tokens } = args;
    assert.equal(tokenOwner, owner_account, 'wrong tokenOwner');
    assert.equal(spender, alice_account, 'wrong spender');
    assert.equal(Number(tokens), amount, 'wrong amount');
  });

  // function allowance(address tokenOwner, address spender) public constant returns (uint remaining);
  it('should return allowance amount', async () => {
    const amount = 10 * (10 ** 18);
    const instance = await Token.deployed();
    const _allowance = await instance.allowance.call(owner_account, alice_account);
    assert.equal(Number(_allowance), amount, 'incorrect allowance amount');
  });

  // function transferFrom(address from, address to, uint tokens) public returns (bool success);
  it('should allow a spender to transfer allowance', async () => {
    const amount = 10 * (10 ** 18);
    const instance = await Token.deployed();
    const result = await instance.transferFrom.call(owner_account, bob_account, amount, { from: alice_account });
    assert.isTrue(result, 'transferFrom failed');
    const transferFromObject = await instance.transferFrom(owner_account, bob_account, amount, { from: alice_account });

    // event Transfer(address indexed from, address indexed to, uint tokens);
    const { event, args } = transferFromObject.logs[0];
    assert.equal(event, 'Transfer', 'wrong event logged');
    const { from, to, tokens } = args;
    assert.equal(from, owner_account, 'wrong sender');
    assert.equal(to, bob_account, 'wrong recipient');
    assert.equal(Number(tokens), amount, 'wrong amount');

    const _allowance = await instance.allowance.call(owner_account, alice_account);
    assert.equal(Number(_allowance), 0, 'incorrect allowance amount');
  });

  // ----------------------------------------------------------------------------
  // Token Information
  // ----------------------------------------------------------------------------
  
  // string public constant name = "Token Name";
  it('should have the correct name', async () => {
    const instance = await Token.deployed();
    const _name = await instance.name();
    assert.equal(_name, 'Example Fixed Supply Token', 'name is wrong');
  });

  // string public constant symbol = "SYM";
  it('should have the correct symbol', async () => {
    const instance = await Token.deployed();
    const _symbol = await instance.symbol();
    assert.equal(_symbol, 'FIXED', 'symbol is wrong');
  });

  // uint8 public constant decimals = 18;
  it('should have the correct symbol', async () => {
    const instance = await Token.deployed();
    const deciumals = await instance.decimals();
    assert.equal(Number(deciumals), 18, 'decimals is wrong');
  });

});

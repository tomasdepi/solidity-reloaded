pragma solidity >=0.7.0 <0.9.0;

contract Coin {
    
    address owner;
    mapping(address => uint) public balances;
    
    // Events allow clients to react to specific changes
    event Sent(address from, address to, uint amount);
    
    // Errors provide information about why the function failed
    // Errors are returned to the caller of the function
    error insuffientBalance(uint requested, uint available);
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner {
        require(msg.sender == owner);
        _; // shift to the actual function
    }
    
    // craft coins, since I'm the owner I can create coins
    function mint(address receiver, uint amount) public onlyOwner {
        balances[receiver] += amount;
    }
    
    function send(address receiver, uint amount) public {
        //require(amount <= balances[msg.sender]);
        if(amount > balances[msg.sender])
        revert insuffientBalance({
            requested: amount,
            available: balances[msg.sender]
        });
        
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        
        emit Sent(msg.sender, receiver, amount);
    }
    
}

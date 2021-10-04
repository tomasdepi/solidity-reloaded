pragma solidity >=0.7.0 <0.9.0;

contract Will {
    
    address owner;
    uint fortune;
    bool isDead;
    address payable[] famillyWallets; // this addresses are allowed to send and receive ether
    mapping(address => uint) inheritance;
    
    // payable allows the function to send and receive ether
    constructor() payable {
        owner = msg.sender; // msg.sender represents the address which call the function
        fortune = msg.value; // msg.value represents how many ether is being sent
        isDead = false;
    }
    
    // create modifier to allow only the owner call the contract
    modifier onlyOwner {
        require(msg.sender == owner);
        _; // shift to the actual function
    }
    
    // create modifier to claim the founds only if isDead
    modifier mustBeDead {
        require(isDead == true);
        _; // shift to the actual function
    }
    
    function setInheritance(address payable wallet, uint amount) public{
        inheritance[wallet] = amount;
        famillyWallets.push(wallet);
    }
    
    function payout() private mustBeDead {
        for(uint i=0; i<famillyWallets.length; i++){
            address payable walletToPay =  famillyWallets[i];
            uint amountToPay = inheritance[walletToPay];
            
            walletToPay.transfer(amountToPay);
        }
    }
    
    function dead() public payable onlyOwner {
        isDead = true;
        payout();
    }
    
    function getFortune() public view returns(uint) {
        return fortune;
    }
}


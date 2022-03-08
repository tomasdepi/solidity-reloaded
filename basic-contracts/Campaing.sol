// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract CampaignFactory {

    address[] public deployedCampaigns;

    function createCampaign(uint _minimum) public {
        address newCampaignAddress = address(new Campaign(_minimum, msg.sender));
        deployedCampaigns.push(newCampaignAddress);
    }

    function getDeployedCampaigns() public view returns(address[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {

    struct Request {
        string description;
        uint value;
        uint approvalCount;
        address recipient;
        bool completed;
        mapping(address => bool) approvals;
    }

    address public manager;
    uint public minimumContrubution;
    uint numRequests;
    uint public approversCount;

    mapping(address => bool) approvers;
    Request[] requests;

    constructor(uint _minimum, address _creator) {
        manager = _creator;
        minimumContrubution = _minimum;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function contribute() payable public{
        require(msg.value >= minimumContrubution);
        //approvers.push(msg.sender);
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string memory _description, uint _value, address _recipient) public restricted {
        Request storage newRequest = requests[numRequests++];
        newRequest.description = _description;
        newRequest.value = _value;
        newRequest.recipient = _recipient;
        newRequest.completed = false;
        newRequest.approvalCount = 0;

    }

    function approveRequest(uint _index) public {
        Request storage request = requests[_index];

        require(approvers[msg.sender], 'caller has not donated');
        require(!request.approvals[msg.sender], 'caller has already approved this request');
    
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint _index) public restricted {
        Request storage request = requests[_index];

        require(!request.completed);
        require(request.approvalCount > (approversCount / 2));

        address payable recipient = payable(request.recipient);
        recipient.transfer(request.value);
        request.completed = true;
    }
}




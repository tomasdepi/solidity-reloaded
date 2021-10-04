
pragma solidity >=0.7.0 <0.9.0;

contract SimpleStorage {
    
    string storeData;
    
    function setData (string memory data) public {
        storeData = data;
    }

    // view stablish that the function can not modify the state
    function getData () public view returns (string memory){
        return storeData;
    }
}

pragma solidity >=0.4.22 <0.6.0;

contract VueDapp{
    
    function () external payable {
    }
    
    function getBalance () public view returns(uint) {
        return address(this).balance;
    }
    
    function withdraw() public payable returns(bool) {
        msg.sender.transfer(address(this).balance);
        return true;
    }
    
    function createService() public payable{
    }
}
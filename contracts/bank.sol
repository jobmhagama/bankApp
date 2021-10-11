// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Bank {

int public customercount;

struct Customer {
    uint id;
    string fname;
   string mname;
   string lname;
  string username;
 string password;
}

mapping(uint => Customer) public Customers;
uint[] customers;



function addCustomer(uint _address,string memory _fname, string memory  _mname,string memory _lname,string memory _username,string memory _password)  public {
   
            customercount++;
            Customers[_address].id =_address;
           Customers[_address].fname =_fname;
           Customers[_address].mname=_mname;
           Customers[_address].lname=_lname;
           Customers[_address].username=_username;
            Customers[_address].password=_password;
           customers.push(_address);
}



           uint balance;

 constructor() public {

        balance = 90000;
 }


 function deposit(uint _bal) external{
       balance = balance + _bal;
 }


   function getBalance() external view  returns(uint _amount){
        return balance;
 }







}

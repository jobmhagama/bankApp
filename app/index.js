const express = require("express");
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.set("view engine", "ejs")
app.use(express.json())

// Connecting to the block chain.
const ethers = require("ethers");
const provider = new ethers.providers.JsonRpcProvider("HTTP://127.0.0.1:7545")
const Bank = require("../build/contracts/Bank.json");
const { request } = require("express");
const contractaddress = Bank.networks["5777"].address;
const abi = Bank.abi;

// const ABI = [
//     ' function getBalance() external view  returns(uint _amount)',
//     'function deposit(uint _bal) external',
// ];
const address = "0xd818BbB6Ec494c432c979355ae55573aB519DC81"
const signer = provider.getSigner();
const Bank_R = new ethers.Contract(address, abi, provider)
const Bank_W = new ethers.Contract(address, abi, signer)


async function readBalance() {

    const data = await Bank_W.getBalance()

    return data;



}

async function deposite(amount) {


    const resp = await Bank_W.deposit(amount);
    const receipt = await resp.wait()

    return receipt;
}


async function user_register(user){
    let fname = user.fname;
     let mname = user.mname;
     let lname = user.lname;
     let username = user.username;
     let password = user.password;
     console.log(user);

const res = await  Bank_W.addCustomer(1,fname,mname,lname,username,password);
const receipt = await res.wait()
     return receipt;    
}


// const setAmount = async function setAmount(amount) {


//     await bankinstance.methods.deposit(amount).send({ from: "0x6586F0E0324a01aD056C5a72a248A37a7837A24a" }).then(() => {
//         return "The account balance was updated succefully";


//     });}






app.get("/", (req, res) => {
    readBalance().then((data) => {
        console.log(data.toNumber());
    })

    res.render("index");
})

app.get("/register",(req,res)=>{
    
    res.render("register")
})
app.post("/register",(req,res)=>{
     let user = req.body;
     user_register(user);

})


app.get("/deposit", (req, res) => {
    deposite(2000000).then((receipt) => {

        console.log(receipt)

    })

})



app.listen(8000, () => {
    console.log("The app is running 9000");
})
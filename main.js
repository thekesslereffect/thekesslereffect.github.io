const serverUrl = "https://x7p3keszz9gw.usemoralis.com:2053/server";
const appId = "LoqhyaEBMReG6dJ1wem58GYcKZzNQNFo3GSP3xZw";
Moralis.start({serverUrl, appId});

async function login(){
    let user = Moralis.User.current();
    if (!user){
        try {
            user = await Moralis.authenticate({signingMessage:"Authenticate"});
            await Moralis.enableWeb3();
            console.log(user);
            console.log(user.get('ethAddress'));
        } catch(error){
            console.log(error);
        }
    }
}

async function logOut(){
    await Moralis.User.logOut();
    console.log("logged out");
}

async function mint(){
    console.log("minting...");
    let options = {
        contractAddress: "0x1aAA180d4C82aa7EAcEa1FAe8B09BbB8174Cbbf0",
        functionName: "mint",
        abi: [{"inputs":[{"internalType":"uint256","name":"_mintAmount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"}],
        params:{
            _mintAmount:1
        },
        msgValue: Moralis.Units.ETH(4.44)
    }
    await Moralis.executeFunction(options);
}

document.getElementById("btn-login").onclick=login;
document.getElementById("btn-logOut").onclick=logOut;
document.getElementById("btn-mint").onclick=mint;
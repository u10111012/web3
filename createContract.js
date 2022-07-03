require('dotenv').config();

const Web3 = require('web3')
const web3 = new Web3('https://rinkeby.infura.io/v3/2fa3887a20c649079b20d1fad410fb5a')

const account1 = web3.utils.toChecksumAddress('0x2b90aAff9e3d60cFa74DC7D3675D61064c21559D')
const account2 = web3.utils.toChecksumAddress('0xEc82818BBD209f6694165757f9Ac9A0d0C7048aB')

const privateKey1 = process.env.PRIVATE_KEY_1
const privateKey2 = process.env.PRIVATE_KEY_2


// web3.eth.getBalance(account1,((error, balance) => {
//     console.log('account 1 balance', web3.utils.fromWei(balance,"ether"))
// }))
//
// web3.eth.getBalance(account2,((error, balance) => {
//     console.log('account 2 balance', web3.utils.fromWei(balance,"ether"))
// }))

web3.eth.getTransactionCount(account1, (error, count) => {

    const data = '0x608060405234801561001057600080fd5b506101d7806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806306661abd146100465780634f2be91f14610064578063f88979451461006e575b600080fd5b61004e610078565b60405161005b91906100c3565b60405180910390f35b61006c61007e565b005b610076610099565b005b60005481565b600160008082825461009091906100de565b92505081905550565b60016000808282546100ab9190610134565b92505081905550565b6100bd81610168565b82525050565b60006020820190506100d860008301846100b4565b92915050565b60006100e982610168565b91506100f483610168565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561012957610128610172565b5b828201905092915050565b600061013f82610168565b915061014a83610168565b92508282101561015d5761015c610172565b5b828203905092915050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fdfea26469706673582212207a7cd7339133d808bf10cb1530a45df195a5ef8361d816ff3a6f14a30862049064736f6c63430008070033'
    // build transaction
    const txObject = {
    gas: '1548544',
    gasPrice: web3.utils.toWei('10', 'gwei'),
    data:data
    }

    //sign the transaction
    const signedTransaction = web3.eth.accounts.signTransaction(txObject, privateKey1);

    // broadcast the transaction
    signedTransaction.then(signedTx => {

    const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);

    sentTx.on("receipt", receipt => {
        console.log("receipt: ", receipt);
      });

    sentTx.on("error", err => {
        console.log(err.message)
    });

})
})





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

    // build transaction
    const txObject = {
    to: account2,
    value:web3.utils.toWei('0.1','ether'),
    gas: '21000',
    gasPrice: web3.utils.toWei('10', 'gwei')
    }

    //sign the transaction
    const signedTransaction = web3.eth.accounts.signTransaction(txObject, privateKey1);

    //broadcast the transaction
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


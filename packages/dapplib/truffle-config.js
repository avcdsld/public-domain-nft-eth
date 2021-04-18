require('@babel/register');
({
    ignore: /node_modules/
});
require('@babel/polyfill');

const WalletProvider = require('./src/wallet-provider');


let mnemonic = 'guess glimpse flame suspect notice crime remind equip good ensure supply seat'; 
let testAccounts = [
"0xc22f47f61e455c876d62d97ca4d3b6077050231a9b5bec650233767704f40189",
"0x16393614e8d3163c11cdf1bb8ad08c8b0a637189dc5c673f5d292c3a83552107",
"0xc507880d2d90967330f528078cf56d49428556cc6afe0fc422da2b4dcc69cecb",
"0x9915b6abbb66879b22fd6e2616b99555e7330bcff7ce9a9f18e6f73a359c50a0",
"0xfa489812ba5387f9b06f65d17f16a12081dd8b0ceb050f56150cfc41461081ae",
"0xb056467384ae658f1b763e543ad2eb2bf4a9720eaf552bb656eace362fce7eed",
"0x23bc01151141830e8bf25389ec2b54bcf795a739c4a504fe1c65ef90ff0a3199",
"0x6b13c6ce8d989da76ced212af93c6abe91b312d1bf586fff655a1830d9e66fea",
"0x71278b1a343aa869e26d205375060bd2c9c97e574430b588748ce7e43afd234f",
"0x7af03c7f0742b71e664af22b61c4fd09c92dc4a521c178a1664a3c743c85aef4"
]; 
let devUri = 'https://test.confluxrpc.org/v2';
let host = devUri.replace('http://','').replace('https://','');
let privateKeys = new WalletProvider(mnemonic, 10).privateKeys;

module.exports = {
    testAccounts,
    mnemonic,
    networks: {
        development: {
            uri: devUri,
            network_id: '*',
            host,
            port: 80,
            type: "conflux",
            privateKeys,
            walletProvider: () => new WalletProvider(mnemonic, 10)
        }
    },
    compilers: {
        solc: {
            version: '^0.8.0'
        }
    }
};



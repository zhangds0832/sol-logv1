// 1.核心脚本，什么时候买入
const SOLANA = require('@solana/web3.js');
const fs = require('fs');

const { Connection, PublicKey, LAMPORTS_PER_SOL, MAINNET_PROGRAM_ID } = SOLANA;

const WSS_ENDPOINT = 'wss://hidden-cool-putty.solana-mainnet.quiknode.pro/d11545d703ec2dba88fb9bdbb2e03381f1786c3e'; // replace with your URL
const HTTP_ENDPOINT = 'https://hidden-cool-putty.solana-mainnet.quiknode.pro/d11545d703ec2dba88fb9bdbb2e03381f1786c3e'; // replace with your URL

// 与solana 建立联系
const solanaConnection = new Connection(HTTP_ENDPOINT, { wsEndpoint: WSS_ENDPOINT });


const monitor_address = "ASxMiMb1AJGTU4AduPNB2CGqT1TiDqWkLvy7oCUnzw5x";

const monitorNewToken = async () =>{
    console.log("monitoring new solana tokens...");

    const ACCOUNT_TO_WATCH = new PublicKey(monitor_address);
    try{
        solanaConnection.onLogs(ACCOUNT_TO_WATCH, async ({logs, err, signature}) => {
            if (err){
                return;
            }
        })
    } catch(err){ 
        console.log("err =>", err);
    }
}

(async function(){
    await monitorNewToken();
})()
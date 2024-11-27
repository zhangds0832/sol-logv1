// 1.核心脚本，什么时候买入
const SOLANA = require('@solana/web3.js');
const fs = require('fs');
const axios = require('axios');

const { Connection, PublicKey, LAMPORTS_PER_SOL } = SOLANA;

const WSS_ENDPOINT = 'wss://hidden-cool-putty.solana-mainnet.quiknode.pro/d11545d703ec2dba88fb9bdbb2e03381f1786c3e'; // replace with your URL
const HTTP_ENDPOINT = 'https://hidden-cool-putty.solana-mainnet.quiknode.pro/d11545d703ec2dba88fb9bdbb2e03381f1786c3e'; // replace with your URL


const monitor_address = "ASxMiMb1AJGTU4AduPNB2CGqT1TiDqWkLvy7oCUnzw5x";
// const monitor_address = "2ryD7sMxTgHeSSvaWT83VoqiVLpKEuizpgUDqL1EHJD1";

// 与solana 建立联系
const solanaConnection = new Connection(HTTP_ENDPOINT, { wsEndpoint: WSS_ENDPOINT }, "confirmed");

const reTime = () => {
    const date = new Date();
    const options = { timeZone: 'Asia/Shanghai', hour12: false };
    const localDate = date.toLocaleString('zh-CN', options);
    return localDate
}

const saveFile = (objRes, fineName) => {
    const jsonString = JSON.stringify(objRes, null, 2) + ',\n'; // 追加逗号和换行符，方便后续添加内容
    // 将 Set 转换为数组并写入文件
    fs.appendFile(fineName, jsonString, (err) => {
        if (err) {
            console.error('Error writing to file', err);
        } else {
            console.log('Signatures written to signatures.txt');
        }
    });
}

// 第一次买币的记录
let buyList = [];

const init = async () => {
    // 查询余额
    const ACCOUNT_TO_WATCH = new PublicKey(monitor_address);
    let balance = await solanaConnection.getBalance(ACCOUNT_TO_WATCH);
    console.log(`Wallet Balance: ${balance / LAMPORTS_PER_SOL}`);

    solanaConnection.onLogs(ACCOUNT_TO_WATCH, async (logs, context) => {
        // 1.第一层过滤, 过滤jito
        if (logs.logs.length > 15) {

            let obj = {
                buySell: "未知",
                signature: logs.signature,
                SPLToken: "",
                time: reTime(),
                solt: context.slot,
                remark: ""
            }

            // 2.第二层过滤，如果是归零，清库
            if (logs.logs.includes("Program log: Instruction: CloseAccount") && logs.logs.includes("Program log: Instruction: Sell")) {
                obj.remark = "已清仓，归零";
                obj.buySell = "卖";

                saveFile(obj, "0000.txt");
                return
            }

            // 3.第三层： 新币购买，第一次购买
            if (logs.logs.includes("Program log: Create") && logs.logs.includes("Program log: Initialize the associated token account") && logs.logs.includes("Program log: Instruction: Buy")) {
                
                obj.remark = "第一次购买币，注意币可能不是最新发布的";
                obj.buySell = "买";


                obj.SPLToken = await getSPLTokenAddress(logs.signature)

                buyList.push(obj);
                console.log("obj 第一次购买币=>", obj);
                console.log("logs =>", logs);
                saveFile(obj, "1111.txt");
                return
            }

            // 4.第四层：监听卖
            // if(logs.logs.includes("Program log: Instruction: Sell")){
            //     obj.buySell = "卖";
            // }

            console.log("obj =>", obj);
            console.log("logs =>", logs);
        }
        return
    }, "confirmed")
}


const getSPLTokenAddress = async (signature) => {

    return new Promise(async (resolve, reject) =>{
        let transaction =  await solanaConnection.getParsedTransaction(signature, {
            maxSupportedTransactionVersion:0,
            commitment:"confirmed"
        });
    
        // 1. accountKeys 交易相关的账户公钥
        // 2. instructions 交易中要执行的指令
        console.log("accountKeys =>",transaction.transaction.message.accountKeys.length)
        console.log("instructions =>",transaction.transaction.message.instructions.length)
    
        // console.log("accountKeys =>",transaction.transaction.message.accountKeys)
        // console.log("instructions =>",transaction.transaction.message.instructions)
    
    
        if(transaction && transaction.transaction.message.accountKeys.length >= 13 && transaction.transaction.message.instructions.length >= 3){
            console.log("发现新的openbookid");
            console.log("交易hash值 =>", signature);
            console.log("创建者 =>", transaction.transaction.message.accountKeys[0].pubkey.toString());
            
            let transactionMeta = transaction.transaction.message.instructions;
            let accountKeys = [];
    
            transactionMeta.forEach(item =>{
                if(item.accounts){
                    const keys = item.accounts.map(pubkey => pubkey.toBase58());
                    accountKeys = accountKeys.concat(keys);
                }
            })
            console.log("accountKeys all =>", accountKeys);
            resolve(accountKeys[2]);
        }

        resolve("Not SPL Token!")
    })

}
// getSPLTokenAddress("JzvcCruEz3jmLS1oXZZtE6yWAV7Ek6E8Q7kHmpaxNzpEkFCRYz4p8WgPchjPB57gJq4caEApVGGY6HUiKLSNCD7");
init();




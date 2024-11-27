// 1.核心脚本，什么时候买入
const SOLANA = require('@solana/web3.js');
const fs = require('fs');
const axios = require('axios');

const { Connection, PublicKey, LAMPORTS_PER_SOL } = SOLANA;

const WSS_ENDPOINT = 'wss://hidden-cool-putty.solana-mainnet.quiknode.pro/d11545d703ec2dba88fb9bdbb2e03381f1786c3e'; // replace with your URL
const HTTP_ENDPOINT = 'https://hidden-cool-putty.solana-mainnet.quiknode.pro/d11545d703ec2dba88fb9bdbb2e03381f1786c3e'; // replace with your URL


const monitor_address = "ASxMiMb1AJGTU4AduPNB2CGqT1TiDqWkLvy7oCUnzw5x";

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
                obj.SPLToken = await getSPLTokenAddressV2(logs.signature);
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
    return new Promise(async (res, rej) => {
        let transaction = await solanaConnection.getParsedTransaction(signature);
        if (!transaction) {
            console.log('Transaction not found');
            res("")
        }
        if (transaction) {
            transaction.transaction.message.instructions.forEach(async (instruction) => {
                if (instruction && instruction.parsed && instruction.parsed.type === "create") {
                    console.log("SPL Token =>", instruction.parsed.info.mint);
                    res(instruction.parsed.info.mint)
                }
            })
        }
        res("")
    })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const getSPLTokenAddressV2 = async (signature) =>{
    let count = 0;
    let res = await getSPLTokenAddress(signature);
    if(res === "" || count < 10){
        await sleep(1000);
        count ++;
        getSPLTokenAddressV2(signature);
    }
}


init();
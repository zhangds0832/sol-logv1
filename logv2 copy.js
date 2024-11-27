const SOLANA = require('@solana/web3.js');
const fs = require('fs');

const { Connection, PublicKey, LAMPORTS_PER_SOL } = SOLANA;

const WSS_ENDPOINT = 'wss://hidden-cool-putty.solana-mainnet.quiknode.pro/d11545d703ec2dba88fb9bdbb2e03381f1786c3e'; // replace with your URL
const HTTP_ENDPOINT = 'https://hidden-cool-putty.solana-mainnet.quiknode.pro/d11545d703ec2dba88fb9bdbb2e03381f1786c3e'; // replace with your URL


const monitor_address = "ASxMiMb1AJGTU4AduPNB2CGqT1TiDqWkLvy7oCUnzw5x";

// 1.与solana 建立联系
const solanaConnection = new Connection(HTTP_ENDPOINT, { wsEndpoint: WSS_ENDPOINT });

const reTime = () =>{
    const date = new Date();
    const options = { timeZone: 'Asia/Shanghai', hour12: false };
    const localDate = date.toLocaleString('zh-CN', options);
    return localDate
}

const init = async () => {
    // 2.查询余额
    const ACCOUNT_TO_WATCH = new PublicKey(monitor_address);
    let balance = await solanaConnection.getBalance(ACCOUNT_TO_WATCH);
    console.log(`Wallet Balance: ${balance / LAMPORTS_PER_SOL}`);

    solanaConnection.onLogs(ACCOUNT_TO_WATCH, async (logs, context) => {
        // 过滤 logs 数组长度大于 8， 就不是 jito！
        if (logs.logs.length > 8 && logs.logs.includes("Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success'") || logs.logs.includes("Program log: Instruction: Buy") || logs.logs.includes("Program log: Instruction: Sell")) {
            console.log(logs.logs)
            let obj = {
                stateBuySell:"未知",
                signature:logs.signature,
                time: reTime(),
                solt:context.slot
            }
            // console.log("obj =>", obj);

            if(logs.logs.includes("Program log: Instruction: Buy")){
                obj.stateBuySell = "Buy";
            }

            if(logs.logs.includes("Program log: Instruction: Sell")){
                obj.stateBuySell = "Sell";
            }

            // 获取交易详情
            const transaction = await solanaConnection.getParsedTransaction(obj.signature, "confirmed");
            console.log("transaction =>", transaction)
            if (!transaction) {
                console.log('Transaction not found');
                return;
            }

            transaction.transaction.message.instructions.forEach(async (instruction) => {
                console.log("sg =>", obj.signature);
                console.log("getTXDetal =>", instruction);
            })
        }
    }, "confirmed")
}


const getTXDetal = async (obj) => {
    // 获取交易详情
    const transaction = await solanaConnection.getParsedTransaction(obj.signature);

    if (!transaction) {
        console.log('Transaction not found');
        return;
    }

    transaction.transaction.message.instructions.forEach(async (instruction) => {
        console.log(3)
        console.log("getTXDetal =>", instruction);

        if (instruction && instruction.parsed && instruction.parsed.type === "create") {
            console.log(`SPL Token: ${instruction.parsed.info.mint}`);
            let objRes = {
                signature: obj.signature,
                SPLToken: instruction.parsed.info.mint,
                time: reTime(),
                solt:obj.slot,
                stateBuySell:obj.stateBuySell,
                pump:`<a>https://pump.fun/coin/${instruction.parsed.info.mint}<a/>`
            }

            console.log("SPL =>", objRes);

            const jsonString = JSON.stringify(objRes, null, 2) + ',\n'; // 追加逗号和换行符，方便后续添加内容

            // 将 Set 转换为数组并写入文件
            fs.appendFile('SPLToken.txt', jsonString, (err) => {
                if (err) {
                    console.error('Error writing to file', err);
                } else {
                    console.log('Signatures written to signatures.txt');
                }
            });

        }
    });
}

init();
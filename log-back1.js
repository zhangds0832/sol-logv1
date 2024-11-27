const SOLANA = require('@solana/web3.js');
const fs = require('fs');

const { Connection, PublicKey, LAMPORTS_PER_SOL } = SOLANA;

const WSS_ENDPOINT = 'wss://hidden-cool-putty.solana-mainnet.quiknode.pro/d11545d703ec2dba88fb9bdbb2e03381f1786c3e'; // replace with your URL
const HTTP_ENDPOINT = 'https://hidden-cool-putty.solana-mainnet.quiknode.pro/d11545d703ec2dba88fb9bdbb2e03381f1786c3e'; // replace with your URL

// 被监听的地址
// const monitor_address = "4sJVcNcvh97JZ9et24vkdAzVjoExvfkKjuBN9LuLXKEZ";
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

    solanaConnection.onLogs(ACCOUNT_TO_WATCH, (logs, context) => {
        // 交易策略，先判断他卖的，如果当前卖的操作，查询上一步日志，是否买了，如果是，则购买
        // if(logs.logs.length > 8 && logs.logs.includes("Program log: Instruction: Sell") || logs.logs.includes("Program log: Instruction: Buy")){
            
        // }
        // 过滤 logs 数组长度大于 8， 就不是 jito！
        if (logs.logs.length > 8 && logs.logs.includes("Program log: Instruction: Buy")) {
            console.log("Logs:", logs);
            console.log("Context:", context);
            let obj = {
                signature: logs.signature,
                time: reTime()
            }

            const jsonString = JSON.stringify(obj, null, 2) + ',\n'; // 追加逗号和换行符，方便后续添加内容

            // 将 Set 转换为数组并写入文件
            fs.appendFile('signatures.txt', jsonString, (err) => {
                if (err) {
                    console.error('Error writing to file', err);
                } else {
                    console.log('Signatures written to signatures.txt');
                }
            });

            getTXDetal(logs.signature);



        }
    })
}


const getTXDetal = async (sg) => {

    // 获取交易详情
    const transaction = await solanaConnection.getParsedTransaction(sg);
    //    console.log("transaction =>", transaction)

    if (!transaction) {
        console.log('Transaction not found');
        return;
    }

    transaction.transaction.message.instructions.forEach(async (instruction) => {
        // console.log(instruction)

        if (instruction && instruction.parsed && instruction.parsed.type === "create") {
            console.log(`SPL Token: ${instruction.parsed.info.mint}`);
            let obj = {
                signature: sg,
                SPLToken: instruction.parsed.info.mint,
                time: reTime()
            }

            const jsonString = JSON.stringify(obj, null, 2) + ',\n'; // 追加逗号和换行符，方便后续添加内容

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
const SOLANA = require('@solana/web3.js');
const { Connection, PublicKey, LAMPORTS_PER_SOL } = SOLANA;

const WSS_ENDPOINT = 'wss://hidden-cool-putty.solana-mainnet.quiknode.pro/d11545d703ec2dba88fb9bdbb2e03381f1786c3e'; // replace with your URL
const HTTP_ENDPOINT = 'https://hidden-cool-putty.solana-mainnet.quiknode.pro/d11545d703ec2dba88fb9bdbb2e03381f1786c3e'; // replace with your URL

// 被监听的地址
// const monitor_address = "4sJVcNcvh97JZ9et24vkdAzVjoExvfkKjuBN9LuLXKEZ";
const monitor_address = "ASxMiMb1AJGTU4AduPNB2CGqT1TiDqWkLvy7oCUnzw5x";


// 1.与solana 建立联系
const solanaConnection = new Connection(HTTP_ENDPOINT,{wsEndpoint:WSS_ENDPOINT});

const init = async () =>{
    // 2.查询余额
    const ACCOUNT_TO_WATCH = new PublicKey(monitor_address);
    let balance = await solanaConnection.getBalance(ACCOUNT_TO_WATCH);
    console.log(`Wallet Balance: ${balance/LAMPORTS_PER_SOL}`);

    // 3.监听钱包地址
    const subscriptionId = await solanaConnection.onAccountChange(ACCOUNT_TO_WATCH, (updatedAccountInfo) =>{
        console.log(`---Event Notification for ${ACCOUNT_TO_WATCH.toString()}--- \nNew Account Balance:`, updatedAccountInfo.lamports / LAMPORTS_PER_SOL, ' SOL')
    })

    console.log('Starting web socket, subscription ID: ', subscriptionId);
}

init();

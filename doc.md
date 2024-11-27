打新土狗-观察
ASxMiMb1AJGTU4AduPNB2CGqT1TiDqWkLvy7oCUnzw5x

a16z
Ah7SnagSabPNPvkcciYwqqyCR1ymMVW3C9tFvJea1kzV

我的
4sJVcNcvh97JZ9et24vkdAzVjoExvfkKjuBN9LuLXKEZ

可疑地址，疑似小费地址，但都是 5x的地址，难道是单独的小费节点？
BebeuGe9Fx2Cr7jgSQazQ9xVgGgEMtAt8Q9jtRbcEcgm

1.监听地址买卖
2.设置交易策略
3.跟单 


```sh
$env:https_proxy="http://127.0.0.1:7890" $env:http_proxy="http://127.0.0.1:7890" $env:all_proxy="socks5://127.0.0.1:7890"
```


场景
1.监听某一个地址买卖
2.


# balance.js 监听余额
- onAccountChange

# log.js 交易日志
```js

const ACCOUNT_TO_WATCH = new PublicKey(monitor_address);

// 记录用户的操作记录
solanaConnection.onLogs(ACCOUNT_TO_WATCH, (logs, context) => {
    // 过滤 logs 数组长度大于 8， 就不是 jito！
    if(logs.logs.length > 8){
        console.log("Logs:", logs);
        console.log("Context:", context);
    }
})
```

```sh
'Program 11111111111111111111111111111111 invoke [1]', 
// 调用系统程序（地址为11111111111111111111111111111111），这是第一个调用。

'Program 11111111111111111111111111111111 success', 
// 系统程序调用成功。

'Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL invoke [1]', 
// 调用与代币相关的程序（地址为ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL），这是第一个调用。

'Program log: Create', 
// 记录了一个创建操作的日志。

'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]', 
// 调用代币程序（地址为TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA），这是第二个调用。

'Program log: Instruction: GetAccountDataSize', 
// 记录了一个指令：获取账户数据大小。

'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1569 of 592983 compute units', 
// 代币程序消耗了1569个计算单位，总可用计算单位为592983。

'Program return: TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA pQAAAAAAAAA=', 
// 代币程序返回的数据，通常是经过编码的结果。

'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success', 
// 代币程序调用成功。

'Program 11111111111111111111111111111111 invoke [2]', 
// 再次调用系统程序，这是第二个调用。

'Program 11111111111111111111111111111111 success', 
// 系统程序调用成功。

'Program log: Initialize the associated token account', 
// 记录了初始化相关代币账户的操作。

'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]', 
// 调用代币程序，这是第二个调用。

'Program log: Instruction: InitializeImmutableOwner', 
// 记录了初始化不可变所有者的指令。

'Program log: Please upgrade to SPL Token 2022 for immutable owner support', 
// 警告信息，提示用户需要升级到SPL Token 2022以支持不可变所有者。

'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1405 of 586396 compute units', 
// 代币程序消耗了1405个计算单位，总可用计算单位为586396。

'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success', 
// 代币程序调用成功。

'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]', 
// 再次调用代币程序，这是第二个调用。

'Program log: Instruction: InitializeAccount3', 
// 记录了初始化账户3的指令。

'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4188 of 582514 compute units', 
// 代币程序消耗了4188个计算单位，总可用计算单位为582514。

'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success', 
// 代币程序调用成功。

'Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL consumed 21807 of 599850 compute units', 
// 代币程序消耗了21807个计算单位，总可用计算单位为599850。

'Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL success', 
// 代币程序调用成功。

'Program 6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P invoke [1]', 
// 调用另一个程序（地址为6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P），这是第一个调用。

'Program log: Instruction: Buy', 
// 记录了购买操作的指令。

'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]', 
// 再次调用代币程序，这是第二个调用。

'Program log: Instruction: Transfer', 
// 记录了转账操作的指令。

'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4645 of 548905 compute units', 
// 代币程序消耗了4645个计算单位，总可用计算单位为548905。

'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success', 
// 代币程序调用成功。

'Program 11111111111111111111111111111111 invoke [2]', 
// 再次调用系统程序，这是第二个调用。

'Program 11111111111111111111111111111111 success', 
// 系统程序调用成功。

'Program 11111111111111111111111111111111 invoke [2]', 
// 再次调用系统程序，这是第二个调用。

'Program 11111111111111111111111111111111 success', 
// 系统程序调用成功。

'Program 6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P invoke [2]', 
// 再次调用另一个程序，这是第二个调用。

'Program 6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P consumed 2003 of 536817 compute units', 
// 该程序消耗了2003个计算单位，总可用计算单位为536817。

'Program 6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P success', 
// 该程序调用成功。

'Program data: vdt/007mYe4/hQHP6hWjiXPooyXza5flEF8ydzWw8qmWvceuUJdmXxFfI1AAAAAARhSAkpMiAAABjF9LiRHyIjjqqF93tZIAeB6MsYzDh6xG1Oi/PnwVBw9K0kVnAAAAAAk/jQMIAAAAtYeWSpZSAwAJk2kHAQAAALXvg/4EVAIA', 
// 该程序返回的数据，通常是经过编码的结果，包含交易的额外信息。

'Program 6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P consumed 44954 of 578043 compute units', 
// 该程序消耗了44954个计算单位，总可用计算单位为578043。

'Program 6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P success' 
// 该程序调用成功。

```


```json
// 日志记录
{
  signature: '5ZnskSRY2QbSVs3RxiPfJAbemtaoCeit7eYK2H23LFSGvoid7V19SLc89VStkotqrKEAJUCVnF3eZFiWQYiVA5Br',
  err: null,
  logs: [
    'Program 11111111111111111111111111111111 invoke [1]',
    'Program 11111111111111111111111111111111 success',
    'Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL invoke [1]',
    'Program log: Create',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]',
    'Program log: Instruction: GetAccountDataSize',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1569 of 592983 compute units',
    'Program return: TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA pQAAAAAAAAA=',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success',
    'Program 11111111111111111111111111111111 invoke [2]',
    'Program 11111111111111111111111111111111 success',
    'Program log: Initialize the associated token account',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]',
    'Program log: Instruction: InitializeImmutableOwner',
    'Program log: Please upgrade to SPL Token 2022 for immutable owner support',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1405 of 586396 compute units',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]',
    'Program log: Instruction: InitializeAccount3',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4188 of 582514 compute units',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success',
    'Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL consumed 21807 of 599850 compute units',
    'Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL success',
    'Program 6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P invoke [1]',
    'Program log: Instruction: Buy',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]',
    'Program log: Instruction: Transfer',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4645 of 548905 compute units',
    'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success',
    'Program 11111111111111111111111111111111 invoke [2]',
    'Program 11111111111111111111111111111111 success',
    'Program 11111111111111111111111111111111 invoke [2]',
    'Program 11111111111111111111111111111111 success',
    'Program 6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P invoke [2]',
    'Program 6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P consumed 2003 of 536817 compute units',
    'Program 6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P success',
    'Program data: vdt/007mYe4/hQHP6hWjiXPooyXza5flEF8ydzWw8qmWvceuUJdmXxFfI1AAAAAARhSAkpMiAAABjF9LiRHyIjjqqF93tZIAeB6MsYzDh6xG1Oi/PnwVBw9K0kVnAAAAAAk/jQMIAAAAtYeWSpZSAwAJk2kHAQAAALXvg/4EVAIA',
    'Program 6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P consumed 44954 of 578043 compute units',
    'Program 6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P success'
  ]
}
```


```json
{
  blockTime: 1732630366, // 交易被确认的区块时间戳
  meta: { // 交易的元数据
    computeUnitsConsumed: 37984, // 消耗的计算单位
    err: null, // 如果交易失败，这里会有错误信息；成功则为 null
    fee: 5000, // 交易费用
    innerInstructions: [ [Object] ], // 内部指令（如果有的话），通常指的是在交易中调用的其他程序的指令
    loadedAddresses: { readonly: [], writable: [] }, // 加载的地址，包括只读和可写的地址
    logMessages: [ // 交易执行过程中的日志信息
      'Program 11111111111111111111111111111111 invoke [1]', // 调用的程序 ID
      'Program 11111111111111111111111111111111 success', // 调用成功
      'Program 6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P invoke [1]', // 另一个程序的调用
      'Program log: Instruction: Sell', // 程序日志，说明执行的指令
      'Program TokenkegQfeZyiNwAJbNbGzvdUvpUYkW7xZgM2xJg7f invoke [2]', // SPL Token 程序的调用
      'Program log: Instruction: Transfer', // 转账指令日志
      'Program TokenkegQfeZyiNwAJbNbGzvdUvpUYkW7xZgM2xJg7f consumed 4645 of 576791 compute units', // 计算单位消耗
      'Program TokenkegQfeZyiNwAJbNbGzvdUvpUYkW7xZgM2xJg7f success', // SPL Token 程序成功
      'Program 6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P invoke [2]', // 另一个程序的调用
      'Program data: vdt/007mYe70F70gFJmId2ol4GVRa+AfGByP9fredP7ZH/1jq/Epn/VwOD0AAAAAOD8IjPAbAAAAjF9LiRHyIjjqqF93tZIAeB6MsYzDh6xG1Oi/PnwVBw9e10VnAAAAAEPzCoUHAAAA+/rMS3yKAwBDR+eIAAAAAPtiuv/qiwIA', // 程序数据
      'Program 6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P consumed 34918 of 599850 compute units', // 计算单位消耗
      'Program 6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P success', // 成功
      'Program TokenkegQfeZyiNwAJbNbGzvdUvpUYkW7xZgM2xJg7f invoke [1]', // SPL Token 调用
      'Program log: Instruction: CloseAccount', // 关闭账户的指令日志
      'Program TokenkegQfeZyiNwAJbNbGzvdUvpUYkW7xZgM2xJg7f consumed 2916 of 564932 compute units', // 计算单位消耗
      'Program TokenkegQfeZyiNwAJbNbGzvdUvpUYkW7xZgM2xJg7f success' // 成功
    ],
    postBalances: [ // 交易后账户余额
      4272267072442, 2298090355,
      404331752328931, 2039280,
      0, 44589535,
      1, 140530000,
      1141440, 731913600,
      112000000, 1461600,
      934087680
    ],
    postTokenBalances: [ [Object] ], // 交易后代币余额
    preBalances: [ // 交易前账户余额
      4271249200144, 3325199464,
      404331742057840, 2039280,
      2039280, 43589535,
      1, 140530000,
      1141440, 731913600,
      112000000, 1461600,
      934087680
    ],
    preTokenBalances: [ [Object], [Object] ], // 交易前代币余额
    rewards: [], // 奖励信息（如果有的话）
    status: { Ok: null } // 交易状态，成功则为 Ok
  },
  slot: 303748298, // 交易所在的槽位
  transaction: { // 交易的详细信息
    message: Message { // 交易消息
      header: [Object], // 消息头
      accountKeys: [Array], // 账户密钥
      recentBlockhash: 'ARgNWuELrgdNGkwYrosmPkVeVLzZA5mRDGNDwwwpJYmt', // 最近的区块哈希
      instructions: [Array], // 交易中的指令
      indexToProgramIds: [Map] // 指令对应的程序 ID
    },
    signatures: [ // 交易的签名
      '2pD49NT9hq5mdKZhwYTrNUCi4Bcthcuv4PAyDmiMwMgqPmrGccgf2TXEwF23QsefjnEcKPvdia8uBeGNaA6hhrRT'
    ]
  }
}

```
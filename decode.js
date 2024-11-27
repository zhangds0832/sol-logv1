const date = new Date();
const options = { timeZone: 'Asia/Shanghai', hour12: false };
const localDate = date.toLocaleString('zh-CN', options);

console.log(localDate);
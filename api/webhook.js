const express = require('express');
const app = express();
app.use(express.json());

app.post('/', (req, res) => {
    // 取得 Dialogflow 傳過來的參數
    const { parameters } = req.body.queryResult;
    const num1 = parseFloat(parameters['number']);    // 第一個數字
    const num2 = parseFloat(parameters['number1']);   // 第二個數字
    const operator = parameters['operator'];          // 運算符號 (加、減、乘、除)

    let result = 0;
    let message = "";

    // 邏輯判斷
    switch (operator) {
        case '加':
        case '+':
            result = num1 + num2;
            break;
        case '減':
        case '-':
            result = num1 - num2;
            break;
        case '乘':
        case '*':
        case 'x':
            result = num1 * num2;
            break;
        case '除':
        case '/':
            if (num2 === 0) {
                message = "數學老師說不能除以 0 喔！";
            } else {
                result = num1 / num2;
            }
            break;
        default:
            message = "我不確定你想做什麼運算，請試試看『5 乘以 8』";
    }

    if (!message) {
        message = `計算結果是：${result}`;
    }

    // 回傳給 Dialogflow 的格式
    res.json({
        fulfillmentText: message
    });
});

module.exports = app;

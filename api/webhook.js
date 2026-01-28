const express = require('express');
const app = express();
app.use(express.json());

app.post('/', (req, res) => {
    try {
        // 直接從 queryResult 抓取參數
        const parameters = req.body.queryResult.parameters || {};
        const num1 = parseFloat(parameters['number']);
        const num2 = parseFloat(parameters['number1']);
        const operator = parameters['operator'] || '';

        let result = 0;

        // 最核心的判斷邏輯
        if (operator === '加' || operator === '+') {
            result = num1 + num2;
        } else if (operator === '減' || operator === '-') {
            result = num1 - num2;
        } else if (operator === '乘' || operator === '*' || operator === 'x') {
            result = num1 * num2;
        } else if (operator === '除' || operator === '/') {
            result = num2 !== 0 ? num1 / num2 : "不能除以0";
        } else {
            result = num1 + num2; // 預設加法
        }

        return res.json({
            fulfillmentText: `計算結果是：${result}`
        });

    } catch (e) {
        return res.json({
            fulfillmentText: "後端運算發生錯誤，請檢查參數設定。"
        });
    }
});

// Vercel 必備
module.exports = app;

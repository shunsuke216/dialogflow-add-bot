const express = require('express');
const app = express();
app.use(express.json());

app.post('/', (req, res) => {
    try {
        const queryResult = req.body.queryResult || {};
        const parameters = queryResult.parameters || {};

        // 💡 抓取你 Dialogflow 設定的參數名稱
        const num1 = parseFloat(parameters['number']);
        const num2 = parseFloat(parameters['number1']);
        const operator = parameters['operator'] || '';

        // 檢查數字是否有效
        if (isNaN(num1) || isNaN(num2)) {
            return res.json({ fulfillmentText: '收到的數字不完全（例如：5加3）。' });
        }

        let result = 0;
        let message = '';

        // 運算邏輯 (支援加減乘除)
        switch (operator) {
            case '加': case '+': result = num1 + num2; break;
            case '減': case '-': result = num1 - num2; break;
            case '乘': case '*': case 'x': result = num1 * num2; break;
            case '除': case '/':
                if (num2 === 0) { message = '數學老師說不能除以 0 喔！'; } 
                else { result = num1 / num2; }
                break;
            default:
                result = num1 + num2; // 預設做加法
                message = `我猜你想做加法，結果是：${result}`;
        }

        if (!message) { message = `計算結果是：${result}`; }

        res.json({ fulfillmentText: message });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ fulfillmentText: '處理過程中出錯。' });
    }
});

// 重要：在 Vercel 只需要導出 app，不能寫 app.listen
module.exports = app;

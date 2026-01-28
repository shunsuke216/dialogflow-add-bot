const express = require('express');
const app = express();
app.use(express.json());

app.post('/', (req, res) => {
    try {
        const queryResult = req.body.queryResult || {};
        const parameters = queryResult.parameters || {};

        // 💡 這裡對齊你 Dialogflow 的命名 (圖 10 與 圖 11)
        const num1 = Number(parameters['number']);
        const num2 = Number(parameters['number1']);
        const operator = parameters['operator'] || '';

        // 如果連數字都抓不到，直接回傳提示
        if (isNaN(num1) || isNaN(num2)) {
            return res.json({ fulfillmentText: '收到的數字不完全，請再說一次，例如「1加0」。' });
        }

        let result = 0;
        let message = '';

        // 運算邏輯
        switch (operator) {
            case '加': case '+': result = num1 + num2; break;
            case '減': case '-': result = num1 - num2; break;
            case '乘': case '*': case 'x': result = num1 * num2; break;
            case '除': case '/':
                if (num2 === 0) {
                    message = '數學老師說不能除以 0 喔！';
                } else {
                    result = num1 / num2;
                }
                break;
            default:
                // 如果 operator 抓不到，預設做加法
                result = num1 + num2;
                message = `我猜你想做加法，結果是：${result}`;
        }

        if (!message) {
            message = `計算結果是：${result}`;
        }

        return res.json({ fulfillmentText: message });

    } catch (error) {
        return res.json({ fulfillmentText: '後端程式碼執行發生意外錯誤。' });
    }
});

// 🔥 關鍵修復：Vercel 專用，絕對不能加 app.listen(...)
module.exports = app;

const express = require('express');
const app = express();
app.use(express.json());

app.post('/', (req, res) => {
    try {
        // 1. 安全取得 parameters，避免 undefined 導致當機 [cite: 2, 12]
        const queryResult = req.body.queryResult || {};
        const parameters = queryResult.parameters || {};

        // 2. 抓取數字與運算符號 
        // 使用 Number() 強制轉換，比 parseFloat 更嚴謹一點
        const num1 = Number(parameters['number']);
        const num2 = Number(parameters['number1']);
        const operator = parameters['operator'] || '';

        // 3. 檢查數字是否有效 
        if (isNaN(num1) || isNaN(num2)) {
            return res.json({ fulfillmentText: '收到的數字不完全，請試試看「1加0」。' });
        }

        let result = 0;
        let message = '';

        // 4. 運算邏輯 [cite: 4, 5, 7]
        switch (operator) {
            case '加': case '+': result = num1 + num2; break;
            case '減': case '-': result = num1 - num2; break;
            case '乘': case '*': case 'x': result = num1 * num2; break;
            case '除': case '/':
                if (num2 === 0) {
                    message = '數學老師說不能除以 0 喔！'; [cite: 6]
                } else {
                    result = num1 / num2; [cite: 7]
                }
                break;
            default:
                // 如果符號沒對上，預設做加法並給提示 
                result = num1 + num2;
                message = `我猜你想做加法，計算結果是：${result}`;
        }

        if (!message) {
            message = `計算結果是：${result}`; [cite: 10, 11]
        }

        return res.json({ fulfillmentText: message }); [cite: 11]

    } catch (error) {
        // 發生任何意外時，回傳錯誤訊息而不是直接讓伺服器死掉 [cite: 12]
        return res.json({ fulfillmentText: '計算過程出了點小問題，請再試一次。' });
    }
});

// Vercel 專用導出，絕對不加 app.listen [cite: 14]
module.exports = app;

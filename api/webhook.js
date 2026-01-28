const express = require('express');
const app = express();

// 讓程式可以解析 JSON
app.use(express.json());

app.post('/', (req, res) => {
    try {
        // 增加安全檢查，避免 queryResult 不存在導致 500 錯誤
        const queryResult = req.body.queryResult;
        if (!queryResult || !queryResult.parameters) {
            return res.json({ fulfillmentText: "收到空請求，請檢查 Dialogflow 設定。" });
        }

        const parameters = queryResult.parameters;
        
        [cite_start]// 對齊你 Dialogflow 的參數名稱 (number 和 number1) [cite: 1]
        const num1 = parseFloat(parameters['number']); 
        const num2 = parseFloat(parameters['number1']);
        const operator = parameters['operator']; [cite_start]// 取得運算符號 [cite: 1]

        let result = 0;
        let message = "";

        [cite_start]// 運算邏輯判斷 [cite: 2, 3]
        switch (operator) {
            case '加':
            case '+':
                result = num1 + num2; [cite_start]// [cite: 2]
                break;
            case '減':
            case '-':
                result = num1 - num2; [cite_start]// [cite: 2]
                break;
            case '乘':
            case '*':
            case 'x':
                result = num1 * num2; [cite_start]// [cite: 3]
                break;
            case '除':
            case '/':
                if (num2 === 0) {
                    message = "數學老師說不能除以 0 喔！"; [cite_start]// [cite: 3]
                } else {
                    result = num1 / num2; [cite_start]// [cite: 4]
                }
                break;
            default:
                [cite_start]// 如果沒抓到 operator，預設做加法，或是給予提示 [cite: 4]
                result = num1 + num2;
                message = `我猜你想做加法，結果是：${result}`;
        }

        if (!message) {
            message = `計算結果是：${result}`; [cite_start]// [cite: 5]
        }

        [cite_start]// 回傳給 Dialogflow [cite: 5]
        res.json({
            fulfillmentText: message
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ fulfillmentText: "後端程式碼執行發生錯誤。" });
    }
});

[cite_start]// 必須導出 app 供 Vercel 使用 [cite: 6]
module.exports = app;

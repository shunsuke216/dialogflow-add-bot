const express = require('express');
const app = express();
app.use(express.json());

// 錯誤處理
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ fulfillmentText: '伺服器出錯了，請檢查後台設定。' });
});

app.post('/', (req, res) => {
    try {
        const { parameters } = req.body.queryResult || {};
        if (!parameters) {
            return res.json({ fulfillmentText: '缺少參數，請確認 Dialogflow 設定。' });
        }

        // 對齊你的截圖：number 為第一個數，number1 為第二個數
        const num1 = parseFloat(parameters['number']); [cite: 2]
        const num2 = parseFloat(parameters['number1']); [cite: 2]
        const operator = parameters['operator'] || ''; [cite: 2]

        // 檢查數字是否有效
        if (isNaN(num1) || isNaN(num2)) { [cite: 3]
            return res.json({ fulfillmentText: '請輸入有效的數字再運算。' }); [cite: 3]
        }

        let result = 0;
        let message = '';

        // 運算邏輯判斷
        switch (operator) {
            case '加':
            case '+':
                result = num1 + num2; [cite: 4]
                break;
            case '減':
            case '-':
                result = num1 - num2;
                break;
            case '乘':
            case '*':
            case 'x':
            case 'X':
                result = num1 * num2; [cite: 5]
                break;
            case '除':
            case '/':
                if (num2 === 0) { [cite: 6]
                    message = '數學老師說不能除以 0 喔！'; [cite: 6]
                } else { [cite: 7]
                    result = num1 / num2; [cite: 7]
                } [cite: 8]
                break;
            default: [cite: 9]
                message = '我不確定你想做什麼運算，請試試看『5 乘以 8』'; [cite: 9]
        } [cite: 10]

        if (!message) {
            message = `計算結果是：${result}`; [cite: 11]
        }

        res.json({ fulfillmentText: message });
    } catch (error) { [cite: 12]
        res.json({ fulfillmentText: '後端執行出錯了，請查看日誌。' }); [cite: 12]
    }
});

// 重要：移除 app.listen，只保留導出
module.exports = app; [cite: 14]

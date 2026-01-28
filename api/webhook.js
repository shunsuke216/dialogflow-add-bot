const express = require('express');
const app = express();
app.use(express.json());

// 錯誤處理中間件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ fulfillmentText: '伺服器出錯了，請再試一次！' });
});

app.post('/', (req, res) => {
    try {
        const { parameters } = req.body.queryResult || {};
        if (!parameters) {
            return res.json({ fulfillmentText: '缺少參數，請檢查 Dialogflow 設定。' });
        }

        const num1 = parseFloat(parameters['number']);
        const num2 = parseFloat(parameters['number1']);
        const operator = parameters['operator'] || '';

        if (isNaN(num1) || isNaN(num2)) {
            return res.json({ fulfillmentText: '請輸入有效的數字，例如『5 加 3』。' });
        }

        let result = 0;
        let message = '';

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
                    message = '數學老師說不能除以 0 喔！';
                } else {
                    result = num1 / num2;
                }
                break;
            default:
                message = '我不確定你想做什麼運算，請試試看『5 乘以 8』';
        }

        if (!message) {
            message = `計算結果是：${result}`;
        }

        res.json({ fulfillmentText: message });
    } catch (error) {
        res.json({ fulfillmentText: '處理過程中出錯，請再試一次。' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;

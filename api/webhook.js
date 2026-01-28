export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const params = req.body.queryResult.parameters;

  const a = Number(params.number1);
  const b = Number(params.number2);

  if (isNaN(a) || isNaN(b)) {
    return res.json({
      fulfillmentText: '我需要兩個數字才能幫你加喔～'
    });
  }

  const result = a + b;

  res.json({
    fulfillmentText: `${a} + ${b} = ${result}`
  });
}


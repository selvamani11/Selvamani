// const express = require('express');
// const { DynamoDBClient, ScanCommand } = require('@aws-sdk/client-dynamodb');
// const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();
// const port = process.env.PORT;

// const client = new DynamoDBClient({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//   }
// });

// const documentClient = DynamoDBDocumentClient.from(client);

// app.use(cors({
//   origin: process.env.REACT_APP_API_URL
// }));

// app.get('/transactions', async (req, res) => {
//   try {
//     const params = {
//       TableName: 'Transaction'
//     };
//     const command = new ScanCommand(params);
//     const data = await documentClient.send(command);
//     res.json(data.Items);
//   } catch (err) {
//     console.error('Error fetching data from DynamoDB:', err);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// const express = require('express');
// const { DynamoDBClient, ScanCommand } = require('@aws-sdk/client-dynamodb');
// const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5000;

// const client = new DynamoDBClient({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });

// const documentClient = DynamoDBDocumentClient.from(client);

// app.use(cors());

// app.get('/transactions', async (req, res) => {
//   try {
//     const params = {
//       TableName: 'Transaction',
//     };
//     const command = new ScanCommand(params);
//     const data = await documentClient.send(command);
//     res.json(data.Items);
//   } catch (err) {
//     console.error('Error fetching data from DynamoDB:', err);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });


const express = require('express');
const { DynamoDBClient, ScanCommand } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb');
const { unmarshall } = require('@aws-sdk/util-dynamodb');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const documentClient = DynamoDBDocumentClient.from(client);

app.use(cors());

app.get('/transactions', async (req, res) => {
  try {
    const params = {
      TableName: 'Transaction',
    };
    const command = new ScanCommand(params);
    const data = await documentClient.send(command);
    const transactions = data.Items.map(item => unmarshall(item));
    res.json(transactions);
  } catch (err) {
    console.error('Error fetching data from DynamoDB:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


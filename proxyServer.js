const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;


app.get('/tt/meta', async (req, res) => {
  setTimeout(async () => {
    try {
      const resData = await axios.get('http://test.clevertec.ru/tt/meta');
      res.json(resData.data);
    } catch(e) {
      console.log(e)
      res.send(401).send(e);
    }
  }, 3000)
});

app.post('/tt/data', async (req, res) => {
  setTimeout(async () => {
    try {
      const result = await axios.post('http://test.clevertec.ru/tt/data', {
        form: {
          ...req.body.data
        }
      });
      res.json(result.data.result);
    } catch(e) {
      console.log(e)
      res.sendStatus(401).send(e);
    }
  }, 3000)
})

app.listen(port, () => console.log('proxy server start'));

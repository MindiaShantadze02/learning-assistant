const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
require('dotenv').config();

app.get('/', (req, res) => {
    res.json("Hello world");
})

app.post('/', (req, res) => {
    const { body } = req;
    const { title } = body;

    const filePath = path.join(__dirname, `${title}.json`);

    fs.writeFile(filePath, content, 'utf8', (err) => {
        if (err) {
          return res.status(500).json({ message: 'Failed to write to file', error: err });
        }
        res.status(200).json({ message: 'Content written to file successfully' });
      });
})

app.listen(process.env.PORT, () => {
    console.log('Server started on port ' + process.env.PORT);
});
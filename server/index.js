const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
require('dotenv').config();

app.use(express.json());

app.get('/', (req, res) => {
    res.json("Hello world");
})

app.post('/quizes', (req, res) => {
    console.log(req)
    const { body } = req;
    const { title, category, quizData } = body;
    
    const categoryPath = path.join(__dirname, `/data/quizes/${category ? category : 'default'}`);
    
    fs.mkdir(categoryPath, (err) => {
        if (err) console.log('The folder already exists');

        console.log('Category folder created successfully!');
    }); 
    const filePath = path.join(`${categoryPath}/${title}.json`);

    fs.writeFile(filePath, JSON.stringify(quizData), 'utf8', (err) => {
        if (err) {
          return res.status(500).json({ message: 'Failed to write to file', error: err });
        }
        res.status(200).json({ message: 'Content written to file successfully' });
      });
});

app.listen(process.env.PORT, () => {
    console.log('Server started on port ' + process.env.PORT);
});
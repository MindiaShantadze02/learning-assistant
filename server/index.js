const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.post('/quizes', (req, res) => {

    if (req.statusCode === 400) throw new Error('body' + req.body);
    const { body } = req;
    const { title, category, quizData } = body;
    
    const categoryPath = path.join(__dirname, `/data/quizes/${category ? category : 'default'}`);
    
    fs.mkdir(categoryPath,{ recursive: true } , (err) => {
        if (err) console.log('The folder already exists');

        console.log('Category folder created successfully!');
        
        const filePath = path.join(`${categoryPath}/${title}.json`);

        fs.writeFile(filePath, JSON.stringify(quizData), 'utf8', (err) => {
            if (err) {
              return res.status(500).json({ message: 'Failed to write to file', error: err });
            }
            res.status(200).json({ message: 'Content written to file successfully' });
          });
    }); 
});

app.get('/categories', (req, res) => {
    const quizzesDir = path.join(__dirname, '/data/quizes');

    fs.readdir(quizzesDir, (err, files) => {
        if (err) {
          return res.status(404).json([]);
        }

        const categories = files.filter(file => fs.statSync(path.join(quizzesDir, file)).isDirectory());
    
        res.json(categories);
      });
})

app.get('/categories/:categoryName', (req, res) => {
    const category = req.params.categoryName;
    const categoryPath = path.join(__dirname, '/data/quizes', category);

    if (!fs.existsSync(categoryPath) || !fs.statSync(categoryPath).isDirectory()) {
        return res.status(404).json({ error: 'Category not found' });
    }

    fs.readdir(categoryPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to read the category directory' });
        }

        const topics = files.map((file) => file.replace('.json', ''));

        res.json({ category, topics });
    });
});

app.get('/categories/:categoryName/:quizName', (req, res) => {
    const { categoryName, quizName } = req.params;
    const quizPath = path.join(__dirname, 'data', 'quizes', categoryName, `${quizName}.json`);

    if (!fs.existsSync(quizPath)) {
        return res.status(404).json({ error: 'Quiz not found' });
    }

    fs.readFile(quizPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read quiz file' });
        }

        try {
            const quiz = JSON.parse(data);
            res.json({ title: quizName, category: categoryName, quiz });
        } catch (parseErr) {
            res.status(500).json({ error: 'Quiz file is corrupted or invalid JSON' });
        }
    });
});

app.listen(process.env.PORT, () => {
    console.log('Server started on port ' + process.env.PORT);
});
require('dotenv').config()

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

const posts = [
    {
        username: 'Kyaw Min Htway',
        title: 'King'
    },
    {
        username: 'Khin Myat Mon Kyaw',
        title: 'Queen'
    }
]
app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
})


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err){
            return res.status(403).json({ message: "Token is not valid"});
        }
        req.user = user;
        next();
    });
}

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
const express = require('express');
const app = express();
const mysql = require('mysql');
const Joi = require('joi')

const PORT = '3000';

//create connection.
const db = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'password',
database: 'nodemysql'
});

// connect to database
db.connect((error) => {
    if (error) throw error;
    console.log("mysql database connected.");
})

// create a new database
app.get('/createDb', (req, res) => {
    let sql = "CREATE DATABASE nodemysql";
    db.query(sql, (err,result) => {
        if (err) throw err;
        res.send("nodemysql DATABASE CREATED!");
    })
});

// create a table
app.get('/createTable', (req, res) => {
    let sql = "CREATE TABLE posts(id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), body VARCHAR(255))";
    db.query(sql, (err,result) => {
        if (err) throw err;
        console.log(result);
        res.send("table created: " + JSON.stringify(result));
    });
});

//Insert into table
app.get('/insertTableRow', (req, res) => {

    let post = {title:"title3", body: "body3"};
    let sql = "INSERT INTO posts SET ?";
    let query = db.query(sql, post, (err,result) => {
        if(err) throw err;
        console.log(result);
        res.send("title1, body1 inserted ");
    });
});

//Get all posts.
app.get('/getPosts', (req, res) => {
    let sql = "SELECT * FROM posts";
    let query = db.query(sql, (err,result) => {
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

// Get only one post
app.get('/getAPost/:id', (req, res) => {
    let sql =`SELECT * FROM posts WHERE id= ${req.params.id}`;
    let query = db.query(sql, (err,result) => {
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

// //update title
app.get('/updateTitle/:id', (req, res) => {
    let new_title = "Update title";
    let sql =`UPDATE posts SET title = '${new_title}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err,result) => {
        if(err) throw err;
        console.log(result);
        res.send("post updated!");
    });
});

//Delete post
app.get('/deletePost/:id', (req, res) => {
    let new_title = "Update title";
    let sql =`DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err,result) => {
        if(err) throw err;
        console.log(result);
        res.send("post Deleted!");
    });
});

function validatePost(post){
    const schema = Joi.object().keys({
    title: Joi.string().min(1).required(),
    body: Joi.string().min(1).max(200).required()
    });
}

app.listen(PORT, () => {
    console.log(`listening on port:  ${PORT}`);
});
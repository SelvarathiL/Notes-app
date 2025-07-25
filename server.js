const express = require('express');
const session = require('express-session');
const path = require('path')
const fs = require('fs')
const ConnectDB = require('./db')
const userroutes = require('./routes/userroutes');
const notesroutes = require('./routes/notesroutes');

const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname,'public')))

app.use(session({
    secret : 'b2045d5dc5e9f3f3348ff3ebbb5b159b1fe9ef1d234d3b607bc195687b6a9a41',
    resave : false,
    saveUnInitialized : false,
    cookie : {secure:false}
}))

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.use('/api/users',userroutes);
app.use('/api/notes',notesroutes);
app.get('/signup',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','signup.html'));
})

app.get('/',(req,res)=>{
    res.redirect('/login');
})

app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','login.html'));
})

app.get('/dashboard',(req,res)=>{
    if (!req.session.user) return res.redirect('/login');
    res.sendFile(path.join(__dirname,'views','dashboard.html'));
})

app.get('/addnote', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'addnote.html'));
});

app.get('/note.html',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','note.html'));
})

app.listen(3000,()=>{
    console.log('Server running on http://localhost:3000');
});
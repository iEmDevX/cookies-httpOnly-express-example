let express = require('express');
let cookieParser = require('cookie-parser');
//setup express app 
let app = express()

app.use(cookieParser());


//basic route for homepage 
app.get('/', (req, res) => {
    const templete = `
    <a href="/setuser">setuser</a>
    <a href="/getuser">getuser</a>
    <a href="/xss">xss</a>
    <a href="/autoXss">autoXss</a>
    <a href="/logout">clear</a>`
    res.send(templete);
});

//Route for adding cookie 
app.get('/setuser', (req, res) => {
    res.setHeader('Set-Cookie', ['foo=bar; HttpOnly', 'x=42; HttpOnly', 'y=88']);
    // res.cookie("userData", users);
    res.send('user data added to cookie <br><a href="/">home</a>');
});

//Iterate users data from cookie 
app.get('/getuser', (req, res) => {
    //shows all the cookies 
    res.send(req.cookies);
});

app.get('/xss', (req, res) => {
    //click to shows all the cookies 
    res.send('<button onclick="alert(document.cookie)">Click me</button><br><a href="/">home</a>');
});

app.get('/autoXss', (req, res) => {
    //when load shows all the cookies 
    res.send(`<body onload=alert(document.cookie)></body>`);
});

//Route for destroying cookie 
app.get('/logout', (req, res) => {
    //it will clear the userData cookie 
    res.clearCookie('y');
    res.clearCookie('x');
    res.clearCookie('foo');
    res.send('user logout and clean cookies successfully<br><a href="/">home</a>');
});


//server listens to port 3000 
app.listen(3000, (err) => {
    if (err)
        throw err;
    console.log('listening on port 3000');
}); 
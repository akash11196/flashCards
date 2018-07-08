const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

app.set('view engine','pug');//setting up pug

app.use((req,res,next)=>{
	console.log('one');
	next();
},
(req,res,next)=>{
	console.log('two');
	next();
});

app.get('/',(req,res)=>{
	const name=req.cookies.username;
	if(name){
	res.render('index',{name});
	}
	else{
	res.redirect('/hello');
	}
});
app.get('/cards',(req,res)=>{
	res.render('card',{prompt:"Question1",hint:"hint"});
});
app.get('/hello',(req,res)=>{
	const name=req.cookies.username;
	if(name){
		res.redirect('/');
	}
	else{
		res.render('hello');
	}
});
app.post('/hello',(req,res)=>{
	res.cookie('username',req.body.username);
	res.redirect('/');
});
app.post('/goodbye',(req,res)=>{
	res.clearCookie('username');
	res.redirect('/hello');
});
app.listen(3000,()=>{
	console.log("App is running");
});

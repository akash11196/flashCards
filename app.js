const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use('/static',express.static('public'));
const err=new Error('404 error');
app.set('view engine','pug');//setting up pug

const mainRoutes=require('./routes');
const cardRoutes=require('./routes/cards');

app.use(mainRoutes);
app.use('/cards',cardRoutes);


app.use((err,req,res,next) =>{
	

	res.locals.error=err;
	res.render('error');
});
app.listen(3000,()=>{
	console.log("App is running");
});

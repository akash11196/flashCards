const express= require('express');
const router=express.Router();
const {data}=require('../data/flashcardData.json');
const {cards}=data;
router.get('/',(req,res)=>{
	const numberOfCards=cards.length;
	const flashcardId=Math.floor(Math.random()*numberOfCards);
	res.redirect(`/cards/${flashcardId}?side=question`);
});

router.get('/:id',(req,res)=>{
	const {side}=req.query;//short hand for side=req.query.side
	const {id}=req.params;
	const text =cards[id][side];
	const {hint}=cards[id];
	const name=req.cookies.username;
	const templateData={id,text,name};
	
	console.log(side);
	if(side=='answer'){
		templateData.sideToShow='question';
		templateData.sideToShowDisplay='Question';
		templateData.text=cards[id][side];
	}
	else{
		templateData.hint=hint;
		templateData.sideToShow='answer';
		templateData.sideToShowDisplay='Answer';
		templateData.text=cards[id]["question"];
	}
	res.render('card',templateData);
});

module.exports=router;

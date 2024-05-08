var express = require('express');
var router = express.Router();
const Users = require("../models/user");

router.use(express.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/users', async(req, res, next) =>{
  try{
    const result = await Users.findAll();
    res.send(result);
  }catch(e){
    console.log("Error while retrieving data",e);
    res.status(500).send("Internal Server Error");
  }
  
});

router.get('/users/:id', async(req, res, next) =>{
  try{
    const id=req.query ? req.query.id :null;
    const result = await Users.findByPk(id);
    res.send(result);
  }catch(e){
    console.log("Error while retrieving single user",e);
    res.status(400).send("No User");
  }
});


router.post('/users', async (req, res, next) => {
  try {
    console.log(req.body, "Request data");
    const result = await Users.create({
      name: req.body.name,
      email: req.body.email
    },{returning:true});

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
router.put('/users/:id',async(req,res,next)=>{
  try{
    const [rowUpdated] = await Users.update(req.body,{
      where:{id:req.query.id},
      returning:true
    })
    if(rowUpdated ===0){
      res.status(404).send('User not found');
    }else{
      res.send("User Updated")
    }
  }catch(e){
    res.status(500).send("Internal Server Error")
  }
  
})
router.delete('/users/:id',async(req,res,next)=>{
  try{

    const result = await Users.destroy({where:{id:Number(req.query.id)}});
    console.log(req.query.id,"result");
    console.log(result,"result");
    res.send("User Deleted ");

  }catch(e){
    console.log("Error while ",e)
    res.status(404).send("Internal Server Error")
  }
})

module.exports = router;

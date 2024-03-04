import mongoose from "mongoose";
import bodyParser from "body-parser";
import express from "express";
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const connection = async ()=> {
  try{
    await mongoose.connect("mongodb+srv://test123:test123@techlite.qs3nbvg.mongodb.net/worker?retryWrites=true&w=majority&appName=TECHLITE");
    console.log('Connected!')
  }
 catch (error) {
    console.log("error");
  }
}
connection ();
var level2Id;
const Schema = mongoose.Schema;
function nextLevelGenerator(req, res, next){
  if(req.body["level1Id"] > 5){
    level2Id = 1;
  } 
  next();
}
app.use(nextLevelGenerator);
const workSchema = new Schema({
  id: Number,
  fName: String,
  lName: String,
  email: {type: String,
          required: [true, "Please enter your email address"]
        },
    leve1Id: Number,
    level2Id: Number,  
  supervisorId: Number,
  sName: String,
  city: String,
  iban: Number
});
const Work = mongoose.model("Work", workSchema);

app.get("/", (req, res) => {
  res.render("index.ejs");
});



app.post("/submit", (req, res)=>{
 var  data = new Work({
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email,
    supervisorId: req.body.supervisorId,
    leve1Id: req.body.level1Id,
    level2Id: level2Id,  
  supervisorId: req.body.supervisorId,
  sName: req.body.sName,
  city: req.body.city,
  iban: req.body.iban
  });
  data.save();
  res.redirect("/");
})

  app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
  });
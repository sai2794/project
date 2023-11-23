const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require ('./models/FormData');


const app = express();
app.use(express.json());
app.use(cors());
app.use("FormData",FormData);

mongoose.connect("mongodb+srv://vamsi:vamsi@cluster0.bvw59pf.mongodb.net/logdetailsdb");
const db = mongoose.connection;
db.on("open",()=>console.log("connected to db"));
db.on("error",()=> console.log("error occured"));

app.post('/register', (req, res)=>{
    // To post / insert data into database

    const {email, password} = req.body;
    FormDataModel.findOne({email: email})
    .then(user => {
        if(user){
            res.json("Already registered")
        }
        else{
            FormDataModel.create(req.body)
            .then(log_reg_form => res.json(log_reg_form))
            .catch(err => res.json(err))
        }
    })
    
})

app.post('/login', (req, res)=>{
    // To find record from the database
    const {email, password} = req.body;
    FormDataModel.findOne({email: email})
    .then(user => {
        if(user){
            // If user found then these 2 cases
            if(user.password === password) {
                res.json("Success");
            }
            else{
                res.json("Wrong password");
            }
        }
        // If user not found then 
        else{
            res.json("No records found! ");
        }
    })
})
app.delete('/delete-account', (req, res) => {
    const { email } = req.body;
  
    FormDataModel.findOneAndDelete({ email })
      .then(deletedUser => {
        if (deletedUser) {
          res.json({ message: 'Account deleted successfully' });
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      })
      .catch(err => res.status(500).json({ message: 'Server error' }));
  });
  

app.listen(3001, () => {
    console.log("Server listining on http://127.0.0.1:3001");
});
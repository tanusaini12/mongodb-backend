//Tanu Saini, 0004831
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
const connectString = 'mongodb+srv://sainitanu2003:Saini12345@cluster0.yao1e.mongodb.net/FCollege'


app.use(bodyParser.json());
app.use(cors()); //Enable cors

mongoose
    .connect(connectString, {})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error Connecting to MongoDB:' , err));

    const userSchema = new mongoose.Schema({
        name: {type:String, required:true},
        email: {type:String, required:true}
    });

    const User = mongoose.model('User,', userSchema);

    //Routes

    //Create a new user
    app.post('/users', async(req, res) => {
        try {
            const {name, email} = req.body
            const user = new User({name, email});
            await user.save();
            res.status(201).send(user);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });

   //read all users
   app.get('/users', async (req,res)=>{
    try{
        const users = await User.find();
        res.send(users);
    }
    catch(error){
        res.status(500).send(error.message);
    }
 });

 //read a single user
 app.get('/users/:id', async (req,res)=>{
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        if(!user) {
           return res.status(404).send('User not found');
        }
        res.status(200).send(user);
     }catch (error){
        res.status(500).send(error.message);
     }
  });
  //update user by id
  app.put('/users/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const {name, email } = req.body;
        const user = await User.findByIdAndUpdate(id, {name, email}, {new:true});
        if(!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send('User Updated Succesfully');        
        } catch(error) {
                res.status(500).send(error.message);
            }
               });

               //Delete user by id
               app.delete('/users/:id', async (req, res) => {
                try{
                    const{ id } = req.params;
                    const user = await User.findByIdAndDelete(id);
                if(!user) {
                    return res.status(404).send('User not found');
                }          
            res.status(200).send('User deleted successfully');
              } catch (error) {
                res.status(500).send(error.message);
              }
               });
    //Start the server
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
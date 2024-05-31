const express = require('express');
const mysql2= require('mysql2');
const dotenv= require('dotenv');
const cors=require('cors');
const knex= require('knex')
const app = express();
app.use(express.json());
dotenv.config()

app.use(cors());
const db = knex({
    client:'mysql2',
    connection:{
        host:process.env.MYSQL_HOST,
        user:process.env.MYSQL_USER,
        password:process.env.MYSQL_PASS,
        database:process.env.MYSQL_DB
    }
});

app.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const data= await db('registered_users')
        .select('*').where({
            email:email,
            password:password
        });
        if(data.length>0)
            {
                return res.json('Login Successfull');
            }
            else{
                return res.json('Please Register');
            }
    }
    catch(err){
        console.error('An error occurred:',err);
        return res.json("Login Failed");
        
    }
   
});

app.post('/register',async(req,res)=>{
    const {name,email,password,confirm_password,Phone_number}=req.body;
    if(!name || !email || !password || !Phone_number)
        {
            res.status(400).send('Incomplete Data');
        }
    if (password===confirm_password)
        {
            try {
                const data = await db('registered_users')
                .insert({name,email,password,Phone_number});
                return res.json('Registered Successfully',data);
            } catch (error) {
                console.error('An error occurred:',error);
                return res.json('Registration Failed')
            }
        }
        return res.status(213).json(`Password doesn't match, please check it!!`)
})


app.listen(8081,()=>{
    console.log('server is running on PORT 8081');
})
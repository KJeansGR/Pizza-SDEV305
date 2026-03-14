//import express module // this is why you add "type: module"
import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';
import {validateForm} from './validation.js'

//load environment variables
dotenv.config();
//create an express application
const app = express();
//define aport number where the servervwill listen
const PORT = 3009;
//set ejs as view engine
app.set('view engine', 'ejs');

//create a pool of database connections
const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user:  process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database:  process.env.DB_NAME,
    port:  process.env.DB_PORT

}).promise();

//Database test root
app.get('/db-test',async(req,res)=>{
    try{
        const pizza_orders = await pool.query('SELECT * FROM orders');
        res.send(pizza_orders[0]);
    }
    catch(err){

        console.log("ERROR: " + err)
    }
});
//MiddleWare that allows express to read form data and store it in req.body
app.use(express.urlencoded({extended: true}))
//create temp array to store orders


//define our main root ('/')
app.get('/', (req,res)=>{

    res.render(`home`);
});

//Contact Route
app.get('/contact-us', (req,res)=>{

    res.render(`contact`);
    //res.sendFile(`${import.meta.dirname}/views/contact.html`);
});

//Thankyou for order
app.post('/submit-order', async(req,res)=>{

    const order = req.body;

    const valid = validateForm(order);
    if(!valid.isValid){
        console.log(valid);
            res.render(`home`, {errors: valid.errors});
        return;
    }

    //store data
    const params =[
        req.body.fname,
        req.body.lname,
        req.body.email,
        req.body.size,
        req.body.method,
        req.body.toppings || "none"
       // req.body.comment
        // timestamp : new Date().toLocaleString()
    ];
// console.log(params);
    const sql = 'INSERT INTO orders (fname, lname, email,size, method,toppings)VALUES(?,?,?,?,?,?)';
    const result = await pool.execute(sql, params);
    res.render(`confirmation`, {order});
    //res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

//admin route
app.get('/admin', async (req, res)=>{

    //read all orders from the database
    //newest first
    const orders = await pool.query(
        "SELECT * FROM orders" );

    res.render(`admin`, {orders: orders[0]});
            console.log(orders);
})

//Thankyou for order
app.get('/thank-you', (req,res)=>{
    res.render(`confirmation`);
});


//start server, and listen on designated PORT
app.listen(PORT, ()=>{

    console.log(`Server is running at 
        http//:localhost:${PORT}`);
})

app.use(express.static('public'));
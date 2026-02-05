//import express module // this is why you add "type: module"
import express from 'express';

//create an express application
const app = express();

//define aport number where the servervwill listen
const PORT = 3000;

//MiddleWare that allows express 
// //to read form data and store it in req.body
app.use(express.urlencoded({extended: true}))
//create temp array to store orders
const orders = [];


//define our main root ('/')
app.get('/', (req,res)=>{

    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

//Contact Route
app.get('/contact-us', (req,res)=>{

    res.sendFile(`${import.meta.dirname}/views/contact.html`);
});

//Thankyou for order
app.post('/submit-order', (req,res)=>{

    //store data
    const order ={
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        method: req.body.method,
        toppings: req.body.toppings || "none",
        size:  req.body.size,
        timestamp : new Date()
    };

    orders.push(order);
    //res.send(orders); // displays the json of orders array
    res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

//admin route
app.get('/admin', (req, res)=>{

    res.send(orders); // displays the json of orders array

})




//Thankyou for order
app.get('/thank-you', (req,res)=>{

    res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});



//start server, and listen on designated PORT
app.listen(PORT, ()=>{

    console.log(`Server is running at 
        http//:localhost:${PORT}`);
})

app.use(express.static('public'));
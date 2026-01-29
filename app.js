//import express module // this is why you add "type: module"
import express from 'express';

//create an express application
const app = express();

//define aport number where the servervwill listen
const PORT = 3000;

//define our main root ('/')
app.get('/', (req,res)=>{

    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

//start server, and listen on designated PORT
app.listen(PORT, ()=>{

    console.log(`Server is running at 
        http//:localhost:${PORT}`);
})

app.use(express.static('public'));
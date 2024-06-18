const express =require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const indexApi=require('./routes/index');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/doc',indexApi);
const mongoURI=process.env.LOCAL_DB_ADDRESS;
mongoose.connect(mongoURI)
.then(()=>console.log('MongoDB connected'))
.catch(err=>console.log('DB connection fail',err));

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})
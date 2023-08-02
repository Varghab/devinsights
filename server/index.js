const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const accountRouter = require('./routes/account')
const blogRouter = require('./routes/blog')
const {connectToDatabase} = require('../server/config/db.config')
const cors = require('cors')
const dotenv = require('dotenv');
const { connectToCloud } = require('./config/cloudinary.config');
dotenv.config();

const port = process.env.PORT;

connectToDatabase().catch(err => console.log(err))
connectToCloud()

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/api/account', accountRouter.router);
app.use('/api/blog', blogRouter.router);

app.listen(port,()=>{
    console.log("Listening at port", port);
})
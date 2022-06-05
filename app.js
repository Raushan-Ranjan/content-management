const express = require('express');
const app = express();
require('express-async-errors');
require('dotenv').config();
const connectDB = require('./db/connect');
const NotFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path')


//route
const authRouter = require('./Route/auth')
const BlogRoute = require('./Route/blog');

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET));
app.use(cors());

app.use(express.static(path.join(__dirname,'content-management')));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'content-management/index.html'));
})

app.get('/',(req,res) => {
    res.send('e-commerce api');
})

// app.use((req,res,next) => {
//     res.setHeader("Access-Control-Allow-Origin","*");
//     res.setHeader("Access-Control-Allow-Header","Origin, X-Requested-With, Content-Type, Accept");
//     res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE,OPTIONS");
//     next()
// })

app.use('/api/v1/auth',authRouter)
// app.use('/api/v1/user',UserRoute)
app.use('/api/v1/blog',BlogRoute)


app.use(NotFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
    try {
        connectDB(process.env.MONGO_URL);
        app.listen(port, console.log(`server is listening on port ${port} ...`));
    } catch (error) {
        console.log(error)
    }
}

start();
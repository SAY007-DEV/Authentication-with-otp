import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import dbconnect from './Database/dbconnection.js';
import authRoutes from './Routes/auth.js';


const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
// import routes


const port=8000;
// server running
app.listen(port,()=>
{
    console.log(`server running on port ${port}`);
    
})

// db connection
dbconnect();

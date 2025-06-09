import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import dbconnect from './Database/dbconnection.js';
import router from './Routes/AuthRoutes/Routes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Error handling middleware for JSON parsing
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ 
            message: 'Invalid JSON format in request body',
            error: err.message 
        });
    }
    next();
});

// Routes
app.use('/Auth/v1', router);

// Error handling for undefined routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

const port = process.env.PORT || 8080;

// Server running
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// DB connection
dbconnect();

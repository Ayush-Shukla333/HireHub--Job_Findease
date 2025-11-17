import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import * as Sentry from "@sentry/node";
import dotenv from "dotenv";
import 'dotenv/config';
import { clerkWebhooks } from './controllers/webhooks.js';
import companyRoutes from './routes/companyRoutes.js';
import connectCloudinary from './config/cloudinary.js';

dotenv.config();

//Initailse Express
const app = express() 

//Connect to databse
await connectDB()
await connectCloudinary()

//Middlewares
app.use(cors())

app.use(express.json())

//Routes
app.get('/', (req, res)=>{
    res.send('API Working')
})

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.get('/test-db', async (req, res) => {
    try {
        const testUser = {
            _id: 'test_' + Date.now(),
            email: 'test@test.com',
            name: 'Test User',
            image: 'https://example.com/image.jpg',
            resume: ''
        };
        
        const User = (await import('./models/User.js')).default;
        const result = await User.create(testUser);
        
        res.json({
            success: true,
            message: 'MongoDB connected and working!',
            user: result
        });
    } catch (error) {
        res.json({
            success: false,
            error: error.message,
            stack: error.stack
        });
    }
});

app.post('/webhooks', clerkWebhooks)
app.use('/api/company', companyRoutes)

//Port
const PORT = process.env.PORT || 5000
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
}) 
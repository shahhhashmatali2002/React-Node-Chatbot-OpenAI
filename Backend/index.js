import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import chatbotRouter from './routes/chatbot.routes.js';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());  // This is required to parse JSON body

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // ✅ for reading JWT from cookies
app.set('view engine', 'ejs');

app.use('/api',chatbotRouter)

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server on http://localhost:${process.env.PORT}`);
  });
});

import express from 'express';
import { chatbotFunc, getChatbotFunc } from '../controllers/chatbot.controller.js';

const chatbotRouter = express.Router();


chatbotRouter.post('/chatbot-api', chatbotFunc);
chatbotRouter.get('/chatbot-api', getChatbotFunc);

export default chatbotRouter;

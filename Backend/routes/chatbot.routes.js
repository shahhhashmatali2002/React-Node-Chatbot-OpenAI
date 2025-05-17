import express from 'express';
import { chatbotFunc, getChatbotFunc } from '../controllers/chatbot.controller.js';
import { chatbotFreeApiFunc, getChatbotFreeApiFunc } from '../controllers/chatbot_free_api.controller.js'

const chatbotRouter = express.Router();


chatbotRouter.post('/chatbot-api', chatbotFunc);
chatbotRouter.get('/chatbot-api', getChatbotFunc);
chatbotRouter.post('/chatbot_free_api',chatbotFreeApiFunc)
chatbotRouter.get('/chatbot_free_api',getChatbotFreeApiFunc)

export default chatbotRouter;

import { OpenAI } from 'openai'; // Correct import for openai SDK
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Initialize OpenAI with the API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Your OpenAI API key
});

// Chatbot function to handle user input and get response from OpenAI
export const chatbotFunc = async (req, res) => {
  const userMessage = req.body.message;

  // Ensure the user message is provided
  if (!userMessage) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Send the request to OpenAI API with the correct model and parameters
    const response = await openai.chat.completions.create({
      model: 'gpt-4', // Ensure the model parameter is included here
      messages: [
        { role: 'system', content: 'You are a helpful assistant' },
        { role: 'user', content: userMessage }, // User's message as input prompt
      ],
      max_tokens: 150, // Adjust based on needs
      temperature: 0.7, // Adjust for randomness/creativity
    });

    // Extract the bot's response from the API result
    const botResponse = response.choices[0].message.content.trim();
    
    // Send back the bot's response as JSON
    res.json({ response: botResponse });
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    res.status(500).json({ error: 'Error generating response from AI' });
  }
};

// Sample GET function for testing the chatbot route
export const getChatbotFunc = (req, res) => {
  res.json({ message: 'success' });
};

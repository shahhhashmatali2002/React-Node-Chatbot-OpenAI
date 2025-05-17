import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

const API_URL = "https://api.together.xyz/v1/chat/completions";
const HEADERS = {
    "Authorization": `Bearer ${process.env.TOGETHER_API_KEY}`,
    "Content-Type": "application/json"
};

console.log(HEADERS)

// Route 1 - Explain Dataset
export const chatbotFreeApiFunc = async (req, res) => {
    // train for own partiuclar organization 
    // const prompt = `
    //     You are an assistant for XYZ Organization. Only answer questions related to XYZ's business, policies, team, services, and structure. Do not respond to general or unrelated queries.

    //     Here is the internal company context:
    //     ${organizationData}

    //     User Question:
    //     ${req.body.message}

    //     Answer:
    //     `;

    const prompt = `${req.body.message}`;

    try {
        const response = await axios.post(API_URL, {
            model: "mistralai/Mistral-7B-Instruct-v0.3",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 3000
        }, { headers: HEADERS });

        res.json({ response: response.data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Sample GET function for testing the chatbot route
export const getChatbotFreeApiFunc = (req, res) => {
  res.json({ message: 'success' });
};
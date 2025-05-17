import {OpenAI} from 'openai'

const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: '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'
})

export const chatbotFreeApiFunc = async (req,res) => {
    const userMessage = req.body.message

    // Ensure the user message is provided
    if (!userMessage) {
        return res.status(400).json({ error: 'Message is required' });
    }
    try {
        // Call the OpenAI API with the user message
        const completion = await openai.chat.completions.create({
            extraHeaders: {
                "HTTP-Referer": "http://localhost:5173/",  // Optional
                "X-Title": "Chatbot",  // Optional
            },
            model: "deepseek/deepseek-v3-base:free",
            messages: [
                {
                    role: "user",
                    content: userMessage
                }
            ]
        });

        // Send back the response from OpenAI API
        const reply = completion.choices[0].message.content;
        res.json({ response: reply });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error communicating with the API');
    }
}

// Sample GET function for testing the chatbot route
export const getChatbotFreeApiFunc = (req, res) => {
  res.json({ message: 'success' });
};
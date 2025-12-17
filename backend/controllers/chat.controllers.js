// backend/controllers/chat.controller.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// FIX: Use Named Imports (curly braces) matching your export
import { toolsDefinition, toolsImplementation } from "../utils/aiTools.js";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatWithAI = async function (req, res, next) {
  try {
    const { message, history } = req.body;

    // SECURITY CHECK:
    // Your User model has 'farmId'. We assume your 'isAuth' middleware populates 'req.user'.
    // If req.user contains the full user object, access farmId directly.
    const user = req.user;

    if (!user || !user.farmId) {
      return res
        .status(403)
        .json({ error: "Unauthorized: No Farm ID associated with this user." });
    }

    const farmId = user.farmId;

    // Initialize Gemini Model with Tools
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      tools: toolsDefinition,
    });

    const chat = model.startChat({
      history: history || [],
      systemInstruction: {
        role: "system",
        parts: [
          {
            text: `
          You are the Intelligent Farm Manager Assistant. 
          You have direct access to the database for Farm ID: ${farmId}.
          
          RULES:
          1. ALWAYS use the provided tools to answer questions about animals, inventory, finance, or workers.
          2. If the user asks about a specific animal (e.g., "How is Cow 101?"), use 'getAnimalDetails'.
          3. If the tool returns empty data, say "I found no records matching that request."
          4. Keep answers concise, helpful, and professional.
          5. Do not make up facts.
        `,
          },
        ],
      },
    });

    // 1. Send User Message
    const result = await chat.sendMessage(message);
    const response = result.response;
    const functionCalls = response.functionCalls();

    // 2. Handle Tool Calls (The "Thinking" Phase)
    if (functionCalls && functionCalls.length > 0) {
      const call = functionCalls[0];
      const fnName = call.name;

      // Validate tool existence
      if (toolsImplementation[fnName]) {
        console.log(`[AI] Executing ${fnName} for Farm ${farmId}`);

        try {
          // Execute the tool function
          // We inject 'farmId' securely here so the AI can't spoof it
          const toolResult = await toolsImplementation[fnName]({
            farmId: farmId,
            ...call.args,
          });

          // Send the specific tool output back to Gemini
          const result2 = await chat.sendMessage([
            {
              functionResponse: {
                name: fnName,
                response: { result: toolResult },
              },
            },
          ]);

          // Return the final interpreted answer
          return res.status(200).json({
            reply: result2.response.text(),
            toolUsed: fnName,
          });
        } catch (toolError) {
          console.error("Tool Execution Error:", toolError);
          return res.status(500).json({
            reply:
              "I tried to access the farm records but encountered an error.",
          });
        }
      }
    }

    // 3. Simple Text Response (No tool needed)
    return res.status(200).json({ reply: response.text() });
  } catch (error) {
    console.error("Chat Controller Error:", error);
    next(error);
  }
};

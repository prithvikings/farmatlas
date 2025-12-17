// backend/utils/aiTools.js
import { User,FeedingLog,FinancialTransaction,InventoryItem,Animal } from "../models/index.js";


const toolsDefinition = [
  {
    functionDeclarations: [
      {
        name: "getFarmStats",
        description: "Get a summary of the farm: total active animals and number of workers.",
      },
      {
        name: "getSickAnimals",
        description: "List all animals that are currently Sick, Injured, or Quarantined.",
      },
      {
        name: "getLowStockInventory",
        description: "List inventory items where the quantity is below the low stock threshold.",
      },
      {
        name: "getRecentExpenses",
        description: "Get the last 5 expense transactions categorized by type.",
      },
      {
        name: "getAnimalDetails",
        description: "Get detailed information about a specific animal using its Tag Number.",
        parameters: {
          type: "OBJECT",
          properties: {
            tagNumber: { type: "STRING", description: "The visual tag number of the animal (e.g., 102, A-45)" }
          },
          required: ["tagNumber"]
        }
      }
    ]
  }
];

// --- 2. Tool Implementation (The Logic) ---
const toolsImplementation = {
  
  getFarmStats: async function(args) {
    const farmId = args.farmId;
    
    const animalCount = await Animal.countDocuments({ 
      farmId: farmId, 
      status: 'ACTIVE' // Only counting active livestock
    });

    const workerCount = await User.countDocuments({ 
      farmId: farmId, 
      role: 'WORKER' 
    });

    return { 
      activeAnimals: animalCount, 
      totalWorkers: workerCount 
    };
  },

  getSickAnimals: async function(args) {
    const farmId = args.farmId;
    
    // Using your Schema's 'status' enum
    const sickAnimals = await Animal.find({ 
      farmId: farmId, 
      status: { $in: ['SICK'] } // You can add 'INJURED' if you add it to enum later
    }).select('tagNumber name status location condition'); // Select readable fields
    
    return sickAnimals;
  },

  getLowStockInventory: async function(args) {
    const farmId = args.farmId;
    
    // MongoDB aggregation to compare 'quantity' vs 'lowStockThreshold'
    const lowStockItems = await InventoryItem.find({ 
      farmId: farmId, 
      $expr: { $lt: ["$quantity", "$lowStockThreshold"] } 
    }).select('name quantity unit lowStockThreshold category');

    return lowStockItems;
  },

  getRecentExpenses: async function(args) {
    const farmId = args.farmId;
    
    const expenses = await FinancialTransaction.find({ 
      farmId: farmId, 
      type: 'EXPENSE' 
    })
    .sort({ date: -1 })
    .limit(5)
    .select('amount category description date');

    return expenses;
  },

  getAnimalDetails: async function(args) {
    const farmId = args.farmId;
    const tagNumber = args.tagNumber;

    const animal = await Animal.findOne({ 
      farmId: farmId, 
      tagNumber: tagNumber 
    });

    if (!animal) return { error: `Animal with Tag ${tagNumber} not found.` };

    // Bonus: Fetch the last feeding log for this animal to give more context
    const lastFeed = await FeedingLog.findOne({ 
      farmId: farmId, 
      animalId: animal._id 
    }).sort({ dateTime: -1 });

    return {
      basicInfo: animal,
      lastFeeding: lastFeed ? `${lastFeed.quantity} ${lastFeed.unit} of ${lastFeed.foodType}` : "No feeding record found."
    };
  }
};

export { toolsDefinition, toolsImplementation };
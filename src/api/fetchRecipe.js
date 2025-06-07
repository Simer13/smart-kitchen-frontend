// src/api/fetchRecipe.js
import axios from "axios";

// IMPORTANT: Replace this with the actual URL of your deployed Render.com backend service.
// Example: const RENDER_BACKEND_URL = "https://your-smart-kitchen-backend.onrender.com";
const RENDER_BACKEND_URL = "https://smart-kitchen-backend.onrender.com"; // **REPLACE THIS WITH YOUR ACTUAL RENDER URL**

/**
 * Calls the backend API to get both an AI recipe suggestion and a real recipe match
 * based on provided ingredients and filters.
 *
 * @param {string[]} ingredients - An array of ingredients.
 * @param {object} filters - An object containing filter preferences (time, mood, type).
 * @returns {Promise<object>} An object containing aiSuggestion (string) and realRecipeData (object or null).
 */
export const getCombinedRecipeData = async (ingredients, filters) => {
    try {
        console.log("Sending request to Render backend for recipe generation...");
        console.log("Ingredients:", ingredients);
        console.log("Filters:", filters);

        const response = await axios.post(`${RENDER_BACKEND_URL}/api/generate-recipe`, {
            ingredients,
            filters,
        });

        console.log("Received response from Render backend:", response.data);
        return response.data; // This will contain { aiSuggestion, realRecipeData } from your backend

    } catch (error) {
        console.error("Error fetching recipe from Render backend:", error);

        // Customize error message based on the response from your backend or network issues
        let errorMessage = "Failed to fetch recipes from the server. Please try again.";

        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("Backend response error:", error.response.data);
            console.error("Backend status:", error.response.status);
            if (error.response.data && error.response.data.error) {
                errorMessage = `Server Error: ${error.response.data.error}`;
            } else {
                errorMessage = `Server responded with status ${error.response.status}.`;
            }
        } else if (error.request) {
            // The request was made but no response was received (e.g., network error, backend down)
            errorMessage = "No response from the recipe server. The backend might be offline or unreachable.";
        } else {
            // Something happened in setting up the request that triggered an Error
            errorMessage = `Error in request setup: ${error.message}`;
        }
        throw new Error(errorMessage);
    }
};

// --- The following old functions are NO LONGER needed and should be removed or commented out ---
// They were for direct API calls from the frontend, which is now handled by the backend.

/*
// Function to get a creative recipe idea from a GPT-like model
export const getAIRecipeSuggestion = async (ingredients, filters) => {
    // This code will now be handled by your Render backend's server.js
    // ... (remove or comment out this entire function)
};

// Function to search for recipes by ingredients and optionally filter by time/type
export const searchSpoonacularRecipes = async (ingredients, filters) => {
    // This code will now be handled by your Render backend's server.js
    // ... (remove or comment out this entire function)
};

// Function to get full recipe information by ID
export const getRecipeDetails = async (recipeId) => {
    // This code will now be handled by your Render backend's server.js
    // ... (remove or comment out this entire function)
};
*/
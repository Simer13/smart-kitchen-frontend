// src/components/RecipeSuggestion.jsx
import React, { useState } from "react";
//import { motion } from "framer-motion";
import { getCombinedRecipeData } from "../api/fetchRecipe"; // <-- UPDATED IMPORT
import "./RecipeSuggesstion.css"

const RecipeSuggestion = ({ ingredients, filters }) => {
    const [loading, setLoading] = useState(false);
    const [aiRecipe, setAiRecipe] = useState("");
    const [realRecipe, setRealRecipe] = useState(null);
    const [error, setError] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [voiceInput, setVoiceInput] = useState("");

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = SpeechRecognition ? new SpeechRecognition() : null;

    if (recognition) {
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('');
            setVoiceInput(transcript);
            setIsListening(false);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            setError("Error with voice input. Please try again.");
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };
    }

    const startListening = () => {
        if (recognition) {
            setVoiceInput("");
            setError("");
            setIsListening(true);
            recognition.start();
        } else {
            setError("Speech recognition not supported in your browser.");
        }
    };

    // Combine manually added ingredients with voice input for use in render and generateRecipe
    const allIngredients = [...ingredients, ...voiceInput.split(',').map(s => s.trim()).filter(s => s)];

    const generateRecipe = async () => {
        setLoading(true);
        setError("");
        setAiRecipe("");
        setRealRecipe(null);

        // If no ingredients are provided, show an error
        if (allIngredients.length === 0) {
            setError("Please provide some ingredients to generate a recipe.");
            setLoading(false);
            return;
        }

        try {
            // Call the ONE new combined function from your backend
            const { aiSuggestion, realRecipeData } = await getCombinedRecipeData(allIngredients, filters); // <-- UPDATED CALL

            setAiRecipe(aiSuggestion);
            setRealRecipe(realRecipeData);

            // Refined error/info messages based on what the backend returns
            if (!aiSuggestion && !realRecipeData) {
                setError("No recipe suggestions could be generated with your current inputs.");
            } else if (!aiSuggestion) {
                setError("Could not get an AI recipe idea.");
            } else if (!realRecipeData) {
                setError("Could not find a matching real recipe on Spoonacular. Here's an AI idea:");
            }

        } catch (err) {
            console.error("Error generating recipe in component:", err);
            // The error message is now likely coming from the `fetchRecipe.js`
            // which already handles detailed error messages from the backend.
            setError(err.message || "An unexpected error occurred while generating recipe. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div style={styles.box} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div style={styles.buttonGroup}>
                <button
                    onClick={startListening}
                    // Use className for styling. Conditional class based on isListening state.
                    className={`recipe-btn ${isListening ? "speak-btn-listening" : "speak-btn-default"}`} // <-- UPDATED className
                    disabled={loading}
                >
                    🎤 {isListening ? "Listening..." : "Speak Ingredients"}
                </button>
                <button
                    onClick={generateRecipe}
                    // Use className for the generate button
                    className="recipe-btn generate-btn" // <-- UPDATED className
                    disabled={loading || isListening || allIngredients.length === 0} // Using allIngredients here
                >
                    🍳 {loading ? "Mixing ingredients..." : "Generate Smart Recipe"}
                </button>
            </div>


            {voiceInput && (
                <p style={styles.voiceInputDisplay}>
                    <strong>You said:</strong> {voiceInput}
                </p>
            )}

            {loading && <p style={styles.loadingText}>Mixing ingredients...</p>}
            {error && <p style={styles.errorText}>{error}</p>}

            {aiRecipe && (
                <motion.div style={styles.recipe} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                    <h3>🤖 AI Suggestion:</h3>
                    <p>{aiRecipe}</p>
                </motion.div>
            )}

            {realRecipe && (
                <motion.div style={styles.recipe} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                    <h3>🍴 Real Recipe Match:</h3>
                    <img src={realRecipe.image} alt={realRecipe.title} style={styles.image} />
                    <h4>{realRecipe.title}</h4>
                    <p><strong>Ready in:</strong> {realRecipe.readyInMinutes} minutes</p>
                    {realRecipe.nutrition?.nutrients && realRecipe.nutrition.nutrients.length > 0 && (
                        <p><strong>Calories:</strong> {realRecipe.nutrition.nutrients.find(n => n.name === "Calories")?.amount.toFixed(0)} kcal</p>
                    )}
                    <p dangerouslySetInnerHTML={{ __html: realRecipe.summary }}></p>
                    <a href={realRecipe.sourceUrl} target="_blank" rel="noopener noreferrer" className="recipe-link"> {/* <-- UPDATED className */}
                        View Full Recipe
                    </a>
                </motion.div>
            )}
        </motion.div>
    );
};

// Styles object - removed all button-specific styles and hover effects
// as they are now in RecipeSuggestion.css
const styles = {
    box: {
        textAlign: "center",
        padding: "20px 0",
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        marginBottom: '20px',
    },
    voiceInputDisplay: {
        marginTop: "15px",
        fontSize: "1em",
        color: "var(--light-text)",
    },
    loadingText: {
        fontSize: "1.1em",
        color: "var(--primary-orange)",
        fontWeight: "600",
        marginTop: "20px",
    },
    errorText: {
        color: "#dc3545",
        marginTop: "15px",
        fontSize: "1em",
        fontWeight: "bold",
    },
    recipe: {
        marginTop: "30px",
        backgroundColor: "var(--white)",
        padding: "30px",
        borderRadius: "var(--border-radius-md)",
        textAlign: "left",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        border: "1px solid #eee",
    },
    image: {
        width: "100%",
        maxWidth: "350px",
        borderRadius: "var(--border-radius-md)",
        marginBottom: "15px",
        display: "block",
        margin: "0 auto",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    },
    // The 'link' style object can also be removed if you moved it entirely to CSS
    // link: {
    //     color: "var(--primary-orange)",
    //     textDecoration: "none",
    //     fontWeight: "600",
    //     marginTop: "15px",
    //     display: "inline-block",
    //     transition: 'color 0.2s ease',
    //     '&:hover': {
    //         color: "#e05a3c",
    //     },
    // },
};

export default RecipeSuggestion;
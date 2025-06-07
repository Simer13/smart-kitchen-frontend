// src/App.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Assuming framer-motion is used for animations
import RecipeSuggestion from './components/RecipeSuggestion';
import Filters from './components/Filters';
import './App.css'; // Global styles for the app

function App() {
    // State to hold ingredients, whether from manual typing or voice input.
    // This combined list will be passed to RecipeSuggestion.
    const [ingredients, setIngredients] = useState([]);

    // State for the text input field for manual ingredient entry.
    const [manualIngredients, setManualIngredients] = useState("");

    // State for filters.
    const [filters, setFilters] = useState({
        time: "No limit",
        mood: "No limit",
        type: "Anything",
    });

    // State to control visibility of the recipe generation section.
    const [showRecipeSection, setShowRecipeSection] = useState(false);

    // Function to add manually typed ingredients to the main ingredients list.
    const handleAddIngredients = () => {
        if (manualIngredients.trim() === "") return; // Don't add empty input

        const newIngredients = manualIngredients.split(',')
                                            .map(item => item.trim())
                                            .filter(item => item !== '');

        // Use a Set to ensure unique ingredients and then convert back to array.
        // This prevents duplicate entries if the user types the same ingredient multiple times.
        setIngredients(prev => [...new Set([...prev, ...newIngredients])]);
        setManualIngredients(""); // Clear the input field after adding.
    };

    // Handler for the "Start Cooking" button in the hero section.
    const handleStartCooking = () => {
        setShowRecipeSection(true); // Reveals the ingredient input and recipe generation area.
    };

    // Handler for the "Try Voice Assistant" button in the hero section.
    const handleTryVoiceAssistant = () => {
        setShowRecipeSection(true); // Reveals the ingredient input and recipe generation area.
        // You might want to automatically trigger the voice listening in RecipeSuggestion here
        // For example, by setting a state like `autoStartVoice: true` and passing it down.
        // However, for simplicity, let's assume the user clicks the "Speak Ingredients" button after this.
    };

    return (
        <div className="App">
            {/* Top Navigation Bar */}
            <nav style={appStyles.nav}>
                <div style={appStyles.logo}>
                    <span role="img" aria-label="chef hat">🧑‍🍳</span> FlavorAI
                </div>
                <div style={appStyles.navLinks}>
                    <a href="#features" style={appStyles.navLink}>Features</a>
                    <a href="#about" style={appStyles.navLink}>About</a>
                    <button style={appStyles.getStartedButton}>Get Started</button>
                </div>
            </nav>

            {/* Conditional Rendering: Show Hero Section or Recipe Generation Section */}
            {!showRecipeSection ? (
                /* Hero Section (Initial Landing View) */
                <motion.div
                    style={appStyles.heroSection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div style={appStyles.heroTextContent}>
                        <p style={appStyles.assistantLabel}>✨ AI-Powered Culinary Assistant</p>
                        <h1 style={appStyles.heroTitle}>Your Smart Kitchen Companion</h1>
                        <p style={appStyles.heroDescription}>
                            Discover personalized recipes, get cooking guidance through voice commands,
                            and transform your culinary journey with AI-powered assistance.
                        </p>
                        <div style={appStyles.heroButtons}>
                            <button onClick={handleStartCooking} style={appStyles.startCookingBtn}>
                                Start Cooking →
                            </button>
                            <button onClick={handleTryVoiceAssistant} style={appStyles.tryVoiceBtn}>
                                🗣️ Try Voice Assistant
                            </button>
                        </div>
                    </div>
                    {/* Visual Placeholder/Mockup for the AI Assistant interface */}
                    <div style={appStyles.heroImagePlaceholder}>
                        <div style={appStyles.placeholderContent}>
                            <div style={appStyles.aiStatus}>
                                <span style={appStyles.aiStatusDot}></span> AI Assistant Active
                            </div>
                            <p style={appStyles.aiQuote}>
                                "I found 3 delicious pasta recipes using your available ingredients..."
                            </p>
                        </div>
                    </div>
                </motion.div>
            ) : (
                /* Recipe Generation Section (Appears after "Start Cooking" or "Try Voice Assistant") */
                <motion.div
                    style={appStyles.recipeSection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2 style={appStyles.sectionHeader}>Let's find your perfect recipe!</h2>

                    {/* Manual Ingredient Input Section */}
                    <div style={appStyles.inputSection}>
                        <input
                            type="text"
                            value={manualIngredients}
                            onChange={(e) => setManualIngredients(e.target.value)}
                            placeholder="Type ingredients (e.g., chicken, onion, rice)"
                            style={appStyles.ingredientInput}
                            onKeyPress={(e) => { // Allows adding by pressing Enter key
                                if (e.key === 'Enter') {
                                    handleAddIngredients();
                                }
                            }}
                        />
                        <button onClick={handleAddIngredients} style={appStyles.addIngredientBtn}>
                            Add
                        </button>
                    </div>

                    {/* Display current ingredients and clear button */}
                    {ingredients.length > 0 && (
                        <motion.div
                            style={appStyles.currentIngredients}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.3 }}
                        >
                            <strong>Your Pantry:</strong> {ingredients.join(', ')}
                            <button onClick={() => setIngredients([])} style={appStyles.clearButton}>
                                Clear All
                            </button>
                        </motion.div>
                    )}

                    {/* Filters Component */}
                    <Filters filters={filters} setFilters={setFilters} />

                    {/* Recipe Suggestion Component - receives combined ingredients and filters */}
                    <RecipeSuggestion ingredients={ingredients} filters={filters} />
                </motion.div>
            )}
        </div>
    );
}

// Inline styles for the App component.
// These mimic the design from the FlavorAI screenshot.
const appStyles = {
    // Top Navigation Styles
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 0',
        marginBottom: '40px', // Space below the nav
    },
    logo: {
        fontSize: '1.8em',
        fontWeight: '700',
        color: 'var(--primary-orange)', // Using CSS variable from App.css
        display: 'flex',
        alignItems: 'center',
        gap: '8px', // Space between emoji and text
    },
    navLinks: {
        display: 'flex',
        gap: '25px',
        alignItems: 'center',
    },
    navLink: {
        textDecoration: 'none',
        color: 'var(--dark-text)',
        fontSize: '1.05em',
        fontWeight: '600',
        transition: 'color 0.2s ease-in-out',
        // Note: Inline styles don't support pseudo-classes like :hover directly.
        // You'd use a CSS class or a styled-component for proper hover effects.
        // For demonstration, these are the base styles.
    },
    getStartedButton: {
        padding: '10px 20px',
        backgroundColor: 'var(--white)',
        color: 'var(--primary-orange)',
        border: '2px solid var(--primary-orange)',
        borderRadius: '8px',
        fontSize: '1em',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        // Hover effects would need CSS classes or styled-components
    },

    // Hero Section Styles (Initial Landing View)
    heroSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '50px 0',
        gap: '40px', // Space between text content and image placeholder
        flexWrap: 'wrap', // Allow wrapping on smaller screens
    },
    heroTextContent: {
        flex: 1,
        minWidth: '300px', // Ensure text content doesn't get too narrow
        textAlign: 'left',
    },
    assistantLabel: {
        color: 'var(--primary-orange)',
        fontWeight: '600',
        fontSize: '1.1em',
        marginBottom: '10px',
    },
    heroTitle: {
        fontSize: '3.5em',
        fontWeight: '700',
        color: 'var(--dark-text)',
        lineHeight: '1.1',
        marginBottom: '20px',
    },
    heroDescription: {
        fontSize: '1.1em',
        color: 'var(--light-text)',
        lineHeight: '1.6',
        marginBottom: '30px',
    },
    heroButtons: {
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap', // Allow buttons to wrap
    },
    startCookingBtn: {
        padding: '15px 30px',
        backgroundColor: 'var(--primary-orange)',
        color: 'var(--white)',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1.1em',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    tryVoiceBtn: {
        padding: '15px 30px',
        backgroundColor: 'var(--white)',
        color: 'var(--dark-text)',
        border: '1px solid #ddd',
        borderRadius: '8px',
        fontSize: '1.1em',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
    },
    heroImagePlaceholder: {
        flex: 1,
        minWidth: '300px', // Ensure placeholder doesn't get too narrow
        backgroundColor: 'var(--secondary-yellow)', // Yellow background for the placeholder
        borderRadius: 'var(--border-radius-lg)',
        minHeight: '400px', // Ensure it has some height
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)', // Inner shadow for depth
        position: 'relative', // For the corner elements
        overflow: 'hidden', // To clip the corner elements
    },
    placeholderContent: {
        backgroundColor: 'var(--white)',
        padding: '20px',
        borderRadius: 'var(--border-radius-md)',
        boxShadow: 'var(--box-shadow)',
        width: '80%',
        textAlign: 'left',
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
    },
    aiStatus: {
        display: 'flex',
        alignItems: 'center',
        fontWeight: '600',
        color: '#28a745', /* Green dot */
        marginBottom: '10px',
    },
    aiStatusDot: {
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: '#28a745',
        marginRight: '8px',
    },
    aiQuote: {
        fontSize: '0.95em',
        color: 'var(--light-text)',
        fontStyle: 'italic',
    },
    // Faux corner elements for the placeholder image (Purely decorative)
    // These are pseudo-elements, which cannot be directly applied with inline styles in React.
    // For these, you would need to define them in `App.css` if you want them exactly like the screenshot.
    // Example in App.css:
    // .heroImagePlaceholder::before { ... }
    // .heroImagePlaceholder::after { ... }


    // Recipe Generation Section Styles (becomes visible after interaction)
    recipeSection: {
        paddingTop: '30px',
        textAlign: 'center',
    },
    sectionHeader: {
        fontSize: '2em',
        fontWeight: '700',
        color: 'var(--dark-text)',
        marginBottom: '30px',
    },
    inputSection: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
        gap: '10px',
    },
    ingredientInput: {
        padding: '12px 18px',
        fontSize: '1em',
        borderRadius: '8px',
        border: '1px solid #ddd',
        width: '60%',
        maxWidth: '400px',
        boxSizing: 'border-box', // Include padding in the element's total width/height
    },
    addIngredientBtn: {
        padding: '12px 25px',
        fontSize: '1em',
        backgroundColor: 'var(--primary-orange)',
        color: 'var(--white)',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    currentIngredients: {
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#f9f9f9', // Lighter background for ingredients display
        borderRadius: '8px',
        border: '1px dashed #eee',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '10px',
        fontSize: '0.95em',
        color: 'var(--light-text)',
    },
    clearButton: {
        marginLeft: '15px',
        padding: '8px 12px',
        fontSize: '0.85em',
        backgroundColor: '#dc3545', // Red for clear
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default App;
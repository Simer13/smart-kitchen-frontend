// src/components/Filters.jsx
import React from "react";
import { motion } from "framer-motion";
import "./Filters.css"; // Optional: Your custom CSS for better visuals

const Filters = ({ filters, setFilters }) => {
    const filterOptions = {
        time: ["<10 mins", "<30 mins", "No limit"],
        mood: ["Comfort", "Quick Fix", "Fancy", "No limit"],
        type: ["Veg", "Non-Veg", "Anything"],
    };

    const toggleFilter = (category, option) => {
        setFilters({ ...filters, [category]: option });
    };

    return (
        <motion.div
            className="filters-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            {Object.entries(filterOptions).map(([category, options]) => (
                <div key={category} className="filter-group">
                    <p className="filter-label">{category.toUpperCase()}:</p>
                    <div className="filter-buttons">
                        {options.map((opt) => (
                            <button
                                key={opt}
                                className={`filter-button ${
                                    filters[category] === opt ? "active" : ""
                                }`}
                                onClick={() => toggleFilter(category, opt)}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </motion.div>
    );
};

export default Filters;

// src/components/IngredientInput.jsx
import { useState, useRef } from "react";
import { FiMic, FiMicOff } from "react-icons/fi";
import { motion } from "framer-motion";

const IngredientInput = () => {
  const [input, setInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  const handleVoice = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice recognition not supported on this browser");
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition;
    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const voiceInput = event.results[0][0].transcript;
        setInput(voiceInput);
        fakeAIResponse(voiceInput);
        setListening(false);
      };

      recognitionRef.current.onend = () => setListening(false);
    }

    setListening(true);
    recognitionRef.current.start();
  };

  const fakeAIResponse = (text) => {
    setTimeout(() => {
      setAiResponse(`With "${text}", maybe try a quick stir fry or warm sandwich!`);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fakeAIResponse(input);
  };

  return (
    <motion.section
      style={styles.container}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 style={styles.title}>What do you have with you today?</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="e.g. rice, eggs, cheese"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
        />
        <button type="button" onClick={handleVoice} style={styles.micBtn}>
          {listening ? <FiMicOff /> : <FiMic />}
        </button>
        <button type="submit" style={styles.submitBtn}>
          Suggest
        </button>
      </form>

      {aiResponse && (
        <motion.div
          style={styles.responseBox}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          🍽 {aiResponse}
        </motion.div>
      )}
    </motion.section>
  );
};

const styles = {
  container: {
    padding: "40px",
    maxWidth: "700px",
    margin: "0 auto",
    textAlign: "center",
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
    color: "#FF6B4A",
  },
  form: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  input: {
    padding: "12px 16px",
    border: "2px solid #ffb29d",
    borderRadius: "12px",
    fontSize: "16px",
    flex: "1 1 300px",
  },
  micBtn: {
    backgroundColor: "#FFD2B5",
    border: "none",
    borderRadius: "12px",
    padding: "12px",
    fontSize: "20px",
    color: "#5b4636",
  },
  submitBtn: {
    backgroundColor: "#FF6B4A",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "12px",
    fontSize: "16px",
  },
  responseBox: {
    marginTop: "30px",
    backgroundColor: "#fff5ee",
    padding: "20px",
    borderRadius: "16px",
    fontSize: "18px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    color: "#5b4636",
  },
};

export default IngredientInput;

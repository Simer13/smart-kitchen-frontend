// src/components/Hero.jsx
import { motion } from "framer-motion";
import { FiMic } from "react-icons/fi";

const Hero = () => {
  return (
    <section style={styles.container}>
      <div style={styles.wrapper}>
        {/* Emotion Text Side */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={styles.textBlock}
        >
          <div style={styles.badge}>
            Made for days when decisions are too hard
          </div>

          <h1 style={styles.heading}>
            Let your kitchen think <br /> for you today
          </h1>

          <p style={styles.subtext}>
            Whether you're healing, busy, or just tired, this assistant helps you decide what to cook — using what you already have.
          </p>

          <div style={styles.buttonGroup}>
            <button style={styles.primaryButton}>Start Cooking →</button>
            <button style={styles.secondaryButton}>
              <FiMic /> Try Voice Input
            </button>
          </div>
        </motion.div>

        {/* Visual / AI Chat Block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={styles.visualBlock}
        >
          {/* Floating Images */}
          <motion.img
            src="https://img.icons8.com/emoji/48/stew.png"
            alt="stew"
            style={{ position: "absolute", top: 0, left: 0 }}
            initial={{ y: -10 }}
            animate={{ y: 10 }}
            transition={{ repeat: Infinity, repeatType: "mirror", duration: 2 }}
          />
          <motion.img
            src="https://img.icons8.com/emoji/48/green-salad.png"
            alt="salad"
            style={{ position: "absolute", top: 20, right: 20 }}
            initial={{ x: -10 }}
            animate={{ x: 10 }}
            transition={{ repeat: Infinity, repeatType: "mirror", duration: 3 }}
          />

          {/* Chat UI */}
          <div style={styles.chatBox}>
            <div style={styles.statusDot}></div>
            <div>
              <p style={styles.chatLabel}>Assistant says:</p>
              <p style={styles.chatMessage}>
                "How about a warm bowl of soup with garlic toast today?"
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    padding: "40px",
    boxSizing: "border-box",
  },
  wrapper: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "60px",
    alignItems: "center",
  },
  textBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  badge: {
    backgroundColor: "#FFD2B5",
    color: "#FF6B4A",
    padding: "8px 16px",
    borderRadius: "9999px",
    fontSize: "14px",
    fontWeight: "500",
    width: "fit-content",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  heading: {
    fontSize: "48px",
    fontWeight: "700",
    color: "#FF6B4A",
    lineHeight: "1.2",
  },
  subtext: {
    fontSize: "18px",
    color: "#5b4636cc",
    maxWidth: "500px",
  },
  buttonGroup: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
  },
  primaryButton: {
    backgroundColor: "#FF6B4A",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: "12px",
    border: "none",
    fontSize: "16px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  secondaryButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: "2px solid #FF6B4A",
    color: "#FF6B4A",
    padding: "12px 24px",
    borderRadius: "12px",
    fontSize: "16px",
    backgroundColor: "transparent",
  },
  visualBlock: {
    position: "relative",
    backgroundColor: "#FFD2B5",
    padding: "40px",
    borderRadius: "24px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
  },
  chatBox: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "16px",
    display: "flex",
    gap: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  statusDot: {
    height: "12px",
    width: "12px",
    backgroundColor: "#22c55e",
    borderRadius: "50%",
    marginTop: "6px",
  },
  chatLabel: {
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "4px",
  },
  chatMessage: {
    fontSize: "14px",
    color: "#5b4636aa",
  },
};

export default Hero;

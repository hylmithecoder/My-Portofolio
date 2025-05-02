import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Notifications = ({ notification, setNotification }) => {
  const notificationVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <AnimatePresence>
      {notification.message && (
        <motion.div
          variants={notificationVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.5 }}
          className={`fixed top-20 left-1/2 transform -translate-x-1/2 px-6 py-4 rounded-full text-black font-semibold z-50 ${
            notification.type === "success" ? "bg-green-400" : "bg-red-400"
          }`}
        >
          {notification.message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notifications;

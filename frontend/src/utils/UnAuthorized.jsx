import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Lock } from "lucide-react";

const UnAuthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      {/* Animated Lock Icon */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-red-500 p-6 rounded-full"
      >
        <Lock size={50} className="text-white" />
      </motion.div>

      {/* Error Message */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        className="text-4xl font-bold mt-4"
      >
        403 - Access Denied
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
        className="text-gray-400 mt-2 text-lg"
      >
        You don't have permission to view this page.
      </motion.p>

      {/* Back to Login Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
      >
        <NavLink
          to="/login"
          className="mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
        >
          Go to Login
        </NavLink>
      </motion.div>
    </div>
  );
};

export default UnAuthorized;

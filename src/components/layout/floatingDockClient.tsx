"use client";

import { motion } from "framer-motion";

export default function FloatingDockClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-6 left-1/2 z-50 -translate-x-1/2"
    >
      <div className="glass flex items-center gap-2 px-3 py-3">
        {children}
      </div>
    </motion.nav>
  );
}
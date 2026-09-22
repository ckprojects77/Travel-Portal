import { motion } from "framer-motion";
import { Compass } from "lucide-react";

export default function Loader({ fullScreen = true }) {
  return (
    <div className={fullScreen ? "flex min-h-[60vh] items-center justify-center" : "flex items-center justify-center p-8"}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        className="rounded-full bg-gradient-to-tr from-teal-500 to-sky-500 p-4 shadow-glow"
      >
        <Compass className="h-7 w-7 text-white" />
      </motion.div>
    </div>
  );
}

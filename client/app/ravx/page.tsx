"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiTrash2,
  FiArrowRight,
  FiClock,
  FiUser,
} from "react-icons/fi";
import { toast } from "react-toastify";
import ArcLab from "../components/RavxOS/ArcLab";
import Createlab from "../components/RavxOS/Createlab";

const RavxArc = () => {
  const [arcLabs, setArcLabs] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newLabName, setNewLabName] = useState("");

  // Sample initial data
  useEffect(() => {
    setArcLabs([
      {
        id: 1,
        name: "Neural Core Lab",
        created: new Date(Date.now() - 86400000), // 1 day ago
        creator: "User",
      },
      {
        id: 2,
        name: "Quantum AI Space",
        created: new Date(Date.now() - 172800000), // 2 days ago
        creator: "User",
      },
      {
        id: 3,
        name: "Digital Mind Forge",
        created: new Date(Date.now() - 259200000), // 3 days ago
        creator: "User",
      },
    ]);
  }, []);

  const handleCreateLab = () => {
    if (!newLabName.trim()) {
      toast.error("Please enter a lab name");
      return;
    }

    const newLab = {
      id: arcLabs.length + 1,
      name: newLabName,
      created: new Date(),
      creator: "User",
    };

    setArcLabs((prev) => [newLab, ...prev]);
    setNewLabName("");
    setIsCreating(false);
    toast.success(`Arc Lab "${newLabName}" created successfully!`);
  };

  const handleDeleteLab = (labId: number) => {
    setArcLabs((prev) => prev.filter((lab) => lab.id !== labId));
    toast.success("Arc Lab deleted successfully!");
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return "Just now";
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Arc Labs All Logic */}
      <ArcLab
        arcLabs={arcLabs}
        newLabName={newLabName}
        setNewLabName={setNewLabName}
        setIsCreating={setIsCreating}
        handleCreateLab={handleCreateLab}
        handleDeleteLab={handleDeleteLab}
        formatTimeAgo={formatTimeAgo}
      />

      {/* Create Lab Modal*/}
      <Createlab
        isCreating={isCreating}
        setIsCreating={setIsCreating}
        handleCreateLab={handleCreateLab}
        newLabName={newLabName}
        setNewLabName={setNewLabName}
      />
    </div>
  );
};

export default RavxArc;

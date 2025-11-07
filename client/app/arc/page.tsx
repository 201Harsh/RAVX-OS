"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flip, Slide, toast } from "react-toastify";
import ArcLab from "../components/RavxOS/ArcLab";
import Createlab from "../components/RavxOS/Createlab";
import AxiosInstance from "@/config/Axios";
import { useRouter } from "next/navigation";
import AxiosProxyInstance from "@/config/AxiosProxy";

interface UserDataType {
  id: string;
  name: string;
  email: string;
  password: string;
  LabTokens: number;
  AIAgentTokens: number;
  createdAt: string;
}

const RavxArc = () => {
  const [arcLabs, setArcLabs] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newLabName, setNewLabName] = useState("");
  const [UserData, setUserData] = useState<UserDataType[]>([]);

  const router = useRouter();

  const handleCreateLab = async () => {
    if (!newLabName.trim()) {
      toast.error("Please enter a lab name");
      return;
    }

    try {
      const res = await AxiosInstance.post("/arc/create", {
        name: newLabName,
      });

      if (res.status === 200) {
        const ArcLabData = res.data.ArcLab;
        const newLab = {
          id: ArcLabData._id,
          name: ArcLabData.name,
          created: ArcLabData.CreatedAt,
          creator: ArcLabData.UserId,
        };
        setArcLabs((prev) => [newLab, ...prev]);
        setNewLabName("");
        setIsCreating(false);
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Flip,
        });
      }
    } catch (error: any) {
      if (error.status === 409) {
        setIsCreating(false);
      }

      toast.error(
        error.response?.data?.message ||
          error.response.data.errors.forEach((e: { msg: string }) => {
            toast.error(e.msg, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Flip,
            });
          }),
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Flip,
        }
      );
    }
  };

  const handleDeleteLab = async (labId: number) => {
    try {
      const res = await AxiosInstance.delete(`/arc/del/${labId}`);

      if (res.status === 200) {
        setArcLabs((prev) => prev.filter((lab) => lab.id !== labId));
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Flip,
        });
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
    }
  };

  const handleopenLab = async (labId: string) => {
    try {
      const res = await AxiosInstance.get(`/arc/get/${labId}`);
      if (res.status === 200) {
        router.push(`/arc/${labId}`);
        toast.success("Entering ArcLab...", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Flip,
        });
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
    }
  };

  const formatTimeAgo = (date: any) => {
    const newDate = new Date(date).toLocaleDateString();
    return newDate;
  };

  const fetchArcLabs = async () => {
    try {
      const res = await AxiosInstance.get("/arc/get");
      if (res.status === 200) {
        const ArcLabs = res.data.ArcLab.map((lab: any) => {
          return {
            id: lab._id,
            name: lab.name,
            created: lab.CreatedAt,
            creator: lab.UserId,
          };
        });
        setArcLabs(ArcLabs);
      }
    } catch (error: any) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
    }
  };

  const fetchUserData = async () => {
    try {
      const res = await AxiosInstance.get("/users/profile");
      if (res.status === 200) {
        setUserData(res.data.User);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
    }
  };

  useEffect(() => {
    fetchArcLabs();
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await AxiosInstance.post("/users/logout");
      if (res.status === 200) {
        router.push("/");
        toast.success("Logged out successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
    }
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl"
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
        handleopenLab={handleopenLab}
        handleLogout={handleLogout}
        UserData={UserData}
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

"use client";
import React, { useState } from "react";
import RavxLoader from "../components/RavxLoader";

const RavxPreLoader = ({ children }: { children: React.ReactNode }) => {
  const [IsLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3200);
  };

  handleLoadingComplete();

  if (IsLoading) {
    return (
      <>
        <RavxLoader />
      </>
    );
  }

  return <>{children}</>;
};

export default RavxPreLoader;

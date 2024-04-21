// TokenRefresh.js
import React from "react";
import axios from "axios";

const TokenRefresh = () => {
  const refreshToken = localStorage.getItem("refreshToken");

  const handleRefreshToken = async () => {
    try {
      const response = await axios.post("http://localhost:5000/refresh-token", {
        refreshToken,
      });
      localStorage.setItem("accessToken", response.data.accessToken);
      alert("Token refreshed successfully");
    } catch (error) {
      console.error("Error refreshing token:", error);
      alert("An error occurred while refreshing token");
    }
  };

  return <button onClick={handleRefreshToken}>Refresh Token</button>;
};

export default TokenRefresh;

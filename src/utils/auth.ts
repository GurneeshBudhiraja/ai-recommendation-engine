import axios from "axios";

// Logout user
export const handleLogout = async () => {
  try {
    await axios.post("/api/v1/auth/logout");
    return;
  } catch (error) {
    console.log("Error while logging out user:", error);
    return;
  }
};
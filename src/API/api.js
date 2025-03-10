import axios from "axios";

const API_URL = "http://localhost:5000/api/cv";  // Replace with your actual backend URL

export const uploadCV = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/upload`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading CV:", error);
        throw error;
    }
};

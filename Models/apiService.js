// Frontend API Service
// services/apiService.js

import axios from 'axios';

// Base URL for API - change this to your backend server address
const API_BASE_URL = 'http://localhost:5000/api';

// Create an axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  }
});

// API service methods
const apiService = {
  // Get recommendations based on image and preferences
  getRecommendations: async (imageUri, categories, preferences) => {
    try {
      // Create form data
      const formData = new FormData();
      
      // Add image file
      const fileNameParts = imageUri.split('/');
      const fileName = fileNameParts[fileNameParts.length - 1];
      
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: fileName,
      });
      
      // Add categories and preferences
      formData.append('categories', JSON.stringify(categories));
      
      if (preferences.skinColor) {
        formData.append('skinColor', preferences.skinColor);
      }
      
      if (preferences.ageGroup) {
        formData.append('ageGroup', preferences.ageGroup);
      }
      
      if (preferences.gender) {
        formData.append('gender', preferences.gender);
      }
      
      // Send POST request to backend
      const response = await api.post('/recommendations', formData);
      return response.data;
    } catch (error) {
      console.error('Error getting recommendations:', error);
      throw error;
    }
  },
  
  // Get recommendation history
  getHistory: async () => {
    try {
      const response = await api.get('/history');
      return response.data;
    } catch (error) {
      console.error('Error getting history:', error);
      throw error;
    }
  },
  
  // Delete a history item
  deleteHistoryItem: async (id) => {
    try {
      const response = await api.delete(`/history/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting history item:', error);
      throw error;
    }
  },
  
  // Clear all history
  clearHistory: async () => {
    try {
      const response = await api.delete('/history');
      return response.data;
    } catch (error) {
      console.error('Error clearing history:', error);
      throw error;
    }
  }
};

export default apiService;
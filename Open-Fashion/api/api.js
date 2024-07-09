import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/products'; 

export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Adjust based on your API response structure
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductDetails = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data; // Adjust based on your API response structure
    } catch (error) {
      console.error('Error fetching product details:', error);
      throw error;
    }
  };
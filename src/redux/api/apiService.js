import axios from 'axios';
import { BaseUrl } from '../../utils/url';

const API_URL = `${BaseUrl}/eraktkosh/master/all`;

export const fetchApiData = async () => {
  try {
    const hospitalCode = 100;
    console.log('Hospital Code:', hospitalCode); 
    
    const response = await axios.post(API_URL, { hospitalCode });
    
    console.log('API Response:', response.data); 
    
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error); 
    throw new Error('Failed to fetch API data');
  }
};

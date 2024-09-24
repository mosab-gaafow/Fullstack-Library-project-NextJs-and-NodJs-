export const API = process.env.NODE_ENV === 'production' 
  ? 'https://yourdomain.com' 
  : 'http://localhost:5000/api'; // Update to match your backend server

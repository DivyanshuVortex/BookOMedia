import axios from 'axios';

const API_KEY = 'AIzaSyAKIPbzsKunQptlK9TN2YkzEVnzVciZjNw'; // Replace with your actual API key

export async function googleBooks(params) {
  try {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${params}&filter=partial`,
    );
    return (res);
  } catch (error) {
    console.error('Error fetching books:', error.message);
  }
}

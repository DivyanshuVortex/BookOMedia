import axios from 'axios';

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

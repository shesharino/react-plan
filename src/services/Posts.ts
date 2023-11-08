import axios from "axios";

const client = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
  });

export const getPosts = async (callback?: (data) => void) => {
    const posts = await client.get('/posts');

    if(callback) callback(posts);
}

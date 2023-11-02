import { useEffect, useState } from 'react';
import axios from "axios";
import Table from 'react-bootstrap/Table';

const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

export default function AxiosExample() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    (async () => {
      const posts = await client.get('/posts');
      setPosts(posts.data);
    })();
  }, []);

  return posts?.length > 0 && (
    <Table bordered hover size="sm" variant="dark">
      <thead>
        <tr>
          <th>User ID</th>
          <th>Title</th>
          <th>Body</th>
        </tr>
      </thead>
      <tbody>
        {posts.map(post => (
          <tr key={post.id}>
            <td>{post.userId}</td>
            <td>{post.title}</td>
            <td>{post.body}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

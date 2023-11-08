import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { getPosts } from "../services/Posts";

export default function AxiosExample() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts(({ data }) => setPosts(data));
  }, []);

  return (
    posts?.length > 0 && (
      <Table bordered hover size="sm" variant="dark">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.userId}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  );
}

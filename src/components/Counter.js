import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function Profile() {
  const [count, setCount] = useState(0);
  return (
    <InputGroup>
      <Form.Control type="number" value={count} onChange={e => setCount(Number(e.target.value))} />
      <Button variant="success" onClick={() => setCount(count + 1)}>Increase</Button>
      <Button variant="danger" onClick={() => setCount(count - 1)}>Decrease</Button>
    </InputGroup>
  )
}

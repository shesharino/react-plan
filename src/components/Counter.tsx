import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <InputGroup>
      <Form.Control type="number" role='counter' value={count} onChange={e => setCount(Number(e.target.value))} />
      <Button variant="success" onClick={() => setCount(c => c + 1)}>Increase</Button>
      <Button variant="danger" onClick={() => setCount(c => c - 1)}>Decrease</Button>
    </InputGroup>
  )
}

import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => setCount((c) => c + 33), 2000);
    return () => clearTimeout(timeout);
  }, []);

  const increase = () => {
    setCount((previous) => previous + 1);
  };

  const decrease = () => {
    setCount((previous) => previous - 1);
  };

  return (
    <InputGroup>
      <Form.Control
        type="number"
        role="counter"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
      />
      <Button variant="success" onClick={increase}>
        Increase
      </Button>
      <Button variant="danger" onClick={decrease}>
        Decrease
      </Button>
    </InputGroup>
  );
}

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

let nextId = 0;

export default function Profile() {
  const [items, setItems] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  return (
    <>
      <InputGroup>
        <Button variant="success" onClick={() => {
          setActiveId(nextId);
          setItems([...items, {
            id: nextId++,
            title: newTitle,
            description: newDescription,
            date: new Date().toLocaleString()
          }]);
          setNewTitle('');
          setNewDescription('');
        }}>Add New</Button>
        <Form.Control placeholder="Title" value={items.find(i => i.id === activeId)?.title ?? newTitle}
          onChange={e => items.some(i => i.id === activeId)
            ? setItems(items.map(i => i.id === activeId ? { ...i, title: e.target.value } : i))
            : setNewTitle(e.target.value)} />
        <Form.Control placeholder="Description" value={items.find(i => i.id === activeId)?.description ?? newDescription}
          onChange={e => items.some(i => i.id === activeId)
            ? setItems(items.map(i => i.id === activeId ? { ...i, description: e.target.value } : i))
            : setNewDescription(e.target.value)} />
      </InputGroup>
      <br />
      <Row xs={2}>
        {items.map(item =>
          <Col key={item.id}>
            <Card bg={item.id === activeId && 'secondary'}>
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Card.Text>{item.date}</Card.Text>
              </Card.Body>
              <ButtonGroup>
                <Button onClick={() => setActiveId(item.id)}>Edit</Button>
                <Button variant="danger" onClick={() => setItems(items.filter(i => i.id !== item.id))}>Delete</Button>
              </ButtonGroup>
            </Card>
            <br />
          </Col>
        )}
      </Row>
    </>
  )
}

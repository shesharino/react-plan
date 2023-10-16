import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

let nextId = 0;

export default function TodoList() {
  const [items, setItems] = useState<Item[]>([]);
  const [activeId, setActiveId] = useState<number>(null);
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
        {items.some(i => i.id === activeId) ? <>
          <Form.Control placeholder="Edit Title" value={items.find(i => i.id === activeId)?.title}
            onChange={e => setItems(items.map(i => i.id === activeId ? { ...i, title: e.target.value } : i))} />
          <Form.Control placeholder="Edit Description" value={items.find(i => i.id === activeId)?.description}
            onChange={e => setItems(items.map(i => i.id === activeId ? { ...i, description: e.target.value } : i))} />
        </> : <>
          <Form.Control placeholder="New Title" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
          <Form.Control placeholder="New Description" value={newDescription} onChange={e => setNewDescription(e.target.value)} />
        </>}
      </InputGroup>
      <br />
      <Row role="item-grid" xs={2}>
        {items.map(item =>
          <Col role="item-cell" key={item.id}>
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

import { useCallback, useState } from 'react';
import { useFormControl } from './../hooks/useFormControl';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import EditFields from './EditFields';

let nextId = 0;

export default function TodoList() {
  const [items, setItems] = useState<Item[]>([]);
  const [activeId, setActiveId] = useState<number>(null);
  const { resetValue: resetNewTitle, ...newTitle } = useFormControl();
  const { resetValue: resetNewDescription, ...newDescription } = useFormControl();

  const activeItemExists = items.some(i => i.id === activeId);
  const deleteItem = useCallback((id: number) => setItems(items => items.filter(i => i.id !== id)), []);

  return (<>
    <InputGroup>
      <Button variant="success" onClick={() => {
        setActiveId(nextId);
        setItems([...items, {
          id: nextId++,
          title: newTitle.value,
          description: newDescription.value,
          date: new Date().toLocaleString()
        }]);
        resetNewTitle();
        resetNewDescription();
      }}>Add New</Button>
      {activeItemExists ? <>
        <EditFields items={items} setItems={setItems} activeId={activeId} />
      </> : <>
        <Form.Control placeholder="New Title" {...newTitle} />
        <Form.Control placeholder="New Description" {...newDescription} />
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
              <Button variant="danger" onClick={() => deleteItem(item.id)}>Delete</Button>
            </ButtonGroup>
          </Card>
          <br />
        </Col>
      )}
    </Row>
  </>);
}

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';
import AxiosExample from './components/AxiosExample';
import Counter from './components/Counter';
import TodoList from './components/TodoList';
import logo from './logo.svg';
import './App.css';

export default function App() {
  const [showAxiosModal, setShowAxiosModal] = useState(false);
  const handleClose = () => setShowAxiosModal(false);
  const handleShow = () => setShowAxiosModal(true);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <hr />
        <h2>Exercise 1</h2>
        <Counter />
        <hr />
        <h2>Exercise 2</h2>
        <TodoList />
        <hr />
        <ButtonGroup>
          <Button onClick={handleShow}>Axios API Example</Button>
          <Button variant="secondary">Fetch API Example</Button>
        </ButtonGroup>
        <Modal show={showAxiosModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Axios API Example</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AxiosExample />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </header>
    </div>
  );
}

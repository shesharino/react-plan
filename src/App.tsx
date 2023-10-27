import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';
import AxiosExample from './components/AxiosExample';
import Counter from './components/Counter';
import FetchExample from './components/FetchExample';
import TodoList from './components/TodoList';
import logo from './logo.svg';
import './App.css';

export default function App() {
  const [showAxiosModal, setShowAxiosModal] = useState(false);
  const [showFetchModal, setShowFetchModal] = useState(false);
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
          <Button onClick={() => setShowAxiosModal(true)}>Axios API Example</Button>
          <Button onClick={() => setShowFetchModal(true)} variant="secondary">Fetch API Example</Button>
        </ButtonGroup>
        <Modal show={showAxiosModal} onHide={() => setShowAxiosModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Axios API Example</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AxiosExample />
          </Modal.Body>
          <Modal.Footer />
        </Modal>
        <Modal show={showFetchModal} onHide={() => setShowFetchModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Fetch API Example</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FetchExample />
          </Modal.Body>
          <Modal.Footer />
        </Modal>
      </header>
    </div>
  );
}

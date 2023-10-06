import Counter from './components/Counter';
import TodoList from './components/TodoList';
import logo from './logo.svg';
import './App.css';

function App() {
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
      </header>
    </div>
  );
}

export default App;

import React from 'react';
import { Container } from 'react-bootstrap';
import './App.css';
import Increment from './components/increment/Increment';

function App() {
  return (
    <div className="App">
      <Container>
        <Increment />
      </Container>
    </div>
  );
}

export default App;

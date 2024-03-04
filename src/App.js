import React from 'react';
import AbacusQuiz from './components/AbacusQuiz';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Abacus Quiz App</h1>
      </header>
      <main>
        <AbacusQuiz />
      </main>
      <footer>
        <p>© 2024 Abacus Quiz App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

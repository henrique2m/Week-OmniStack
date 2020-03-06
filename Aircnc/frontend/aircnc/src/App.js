import React from 'react';
import'./App.css';
import Routes from './routes';
import Header from './components/Header';

function App() {
  return (
    <div className="container">
      <Header />
      <div className="content">
        <Routes />
      </div>
    </div>
  );
}

export default App;

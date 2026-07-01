import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('Loading...');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (window.location.pathname === '/') {
      window.history.replaceState(null, '', '/home');
    }

    fetch('/api/hello')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setMessage(data.message))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sleepvia Full-Stack App</h1>
        <p>{error ? `Error: ${error}` : message}</p>
      </header>
    </div>
  );
}

export default App;

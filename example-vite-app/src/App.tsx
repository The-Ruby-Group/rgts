import './App.css';

import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';

import { useEffect, useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Hello, Ruby Group!', count);
  }, []);

  return (
    <div className="App">
      <div>
        <a
          href="https://github.com/the-ruby-group"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img
            src="/ruby-group.svg"
            className="logo rubygroup"
            alt="Ruby Group logo"
          />
        </a>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer noopener">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer noopener">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Ruby Group + Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)} type={'button'}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Ruby Group, Vite, and React logos to learn more
      </p>
    </div>
  );
}

export default App;

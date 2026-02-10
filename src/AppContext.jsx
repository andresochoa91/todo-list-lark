import { useState } from 'react';
import { createContext } from 'react';
import App from './App';

// eslint-disable-next-line react-refresh/only-export-components
export const ExampleContext = createContext({});

const AppContext = () => {
  const [queryString, setQueryString] = useState('');

  return (
    <ExampleContext.Provider value={{ queryString, setQueryString }}>
      <App />
    </ExampleContext.Provider>
  );
};

export default AppContext;

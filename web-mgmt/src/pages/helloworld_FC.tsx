import React from 'react';

interface testType {
  test: string;
}

const App: React.FC<testType> = ({ test }) => {

  return (
    <div>
      App
    </div>
  );

};

export default App;

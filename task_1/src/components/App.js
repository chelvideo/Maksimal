import React from 'react';
import PreviewCard from './PreviewCard';
import EditCard from './EditCard';
import '../styles/App.css';

function App() {
  return (
    <div className="form-cards">
      <PreviewCard />
      <EditCard />
    </div>
  );
}

export default App;

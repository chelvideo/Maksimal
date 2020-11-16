import React from 'react';
import '../styles/App.css';
import Calendar from './Calendar';

function App() {
  function nextMonth() {
    const slider = document.querySelector('.slider');
    slider.append(<Calendar />);
  }
  
  return (
    <div className="app">
      <div className="prev-btn">◄</div>
        <div className="slider">
          <Calendar />
          
        </div>
      <div className="next-btn" onClick={nextMonth}>►</div>
    </div>
  );
}

export default App;

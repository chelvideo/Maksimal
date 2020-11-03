import React from 'react';
import PreviewCard from './PreviewCard'; 
import EdidCard from './EditCard';
import '../styles/App.css';

function App() {
    
    return (
        <div className="form-cards">
            <PreviewCard />
            <EdidCard />   
        </div>
    );
}

export default App;
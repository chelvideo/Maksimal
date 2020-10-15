import React, { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [curListing, changeCurListing] = useState([]);

  useEffect(() => {
    async function getHotPosts(subreddit) {
      const url = `https://www.reddit.com/r/${subreddit}/hot.json`;
      const resp = await fetch(url);
      const data =  await resp.json();
      changeCurListing(data.data.children);
      console.log(data.data.children);
    }
    getHotPosts('reactjs');
  }, [])

  return (
    <div>
      {curListing.map(item => item.data.title)}
    </div>
  );
}

export default App;

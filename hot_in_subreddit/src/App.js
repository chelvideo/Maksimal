import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';

function ListItemLink(props) {
  return (
    props.map(item => {
      return (
      <ListItem button component="a" href={item.data.url}>
        <ListItemText primary={item.data.title} />
      </ListItem>
      )
    })
  );
}


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
      <List>
        {ListItemLink(curListing)}
      </List>
      
    </div>
  );
}

export default App;

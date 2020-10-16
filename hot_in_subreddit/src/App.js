import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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

    async function getHotPosts(subreddit) {
      const url = `https://www.reddit.com/r/${subreddit}/hot.json`;
      const resp = await fetch(url);
      const data =  await resp.json();
      changeCurListing(data.data.children);
      console.log(data.data.children);
    }
    

  function inputSubreddit() {
    const subreddit = document.querySelector('#subreddit');
    console.log(subreddit.value);
    getHotPosts(subreddit.value);
    //changeCurListing(subreddit.value);
  }

  return (
    <div>
       <TextField id="subreddit" label="Subreddit" />
       <Button variant="contained" onClick={inputSubreddit}>Show hot</Button>
      <List>
        {ListItemLink(curListing)}
      </List>
      
    </div>
  );
}

export default App;

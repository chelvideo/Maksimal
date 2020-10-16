import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
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
  const [curListing, changeCurListing] = useState({data: {children: []}});
  const [page, changePage] = useState('');

    async function getHotPosts(subreddit, params) {
      const url = `https://www.reddit.com/r/${subreddit}/hot.json`;
      
      const resp = await fetch(url + params);
      const data =  await resp.json();
      changeCurListing(data);
      changePage(data.data.after);
      console.log(data.data.after);
    }
    

  function inputSubreddit() {
    const subreddit = document.querySelector('#subreddit');
    console.log(subreddit.value);
    getHotPosts(subreddit.value, '');
    //changeCurListing(subreddit.value);
  }

  function nextListing() {
    const subreddit = document.querySelector('#subreddit');
    console.log(subreddit.value);
    const params = `?after=${curListing.data.after}&count=25`;
    getHotPosts(subreddit.value, params);
  }

  function prevListing() {
    const subreddit = document.querySelector('#subreddit');
    console.log(subreddit.value);
    const params = `?before=${curListing.data.before}&count=25`;
    getHotPosts(subreddit.value, params);
  }

  return (
    <div>
       <TextField id="subreddit" label="Subreddit" />
       <Button variant="contained" onClick={inputSubreddit}>Show hot</Button>

       <label htmlFor="icon-button-file">
          <IconButton color="primary" aria-label="upload picture" component="span">
            <ArrowBackIosIcon onClick={prevListing}/>
          </IconButton>
        </label>

        <label htmlFor="icon-button-file">
          <IconButton color="primary" aria-label="upload picture" component="span">
            <ArrowForwardIosIcon onClick={nextListing}/>
          </IconButton>
        </label>
       
      <List>
        {ListItemLink(curListing.data.children)}
      </List>
      
    </div>
  );
}

export default App;

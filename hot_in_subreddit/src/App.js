import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import 'typeface-roboto';
import InputForm from './components/InputForm';
import PaginationBtns from './components/PaginationBtns';
import HotPosts from './components/HotPosts';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '20px auto',
    maxWidth: 1000,
  },
}));

function App() {
  const [curListing, changeCurListing] = useState({data: {children: []}});

  async function getHotPosts(subreddit, params) {
    const url = `https://www.reddit.com/r/${subreddit}/hot.json`;
    const resp = await fetch(url + params);
    const data =  await resp.json();
    changeCurListing(data);
  }
  
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <InputForm getHotPosts={getHotPosts}/>
        <PaginationBtns getHotPosts={getHotPosts} curListing={curListing}/>
        <HotPosts curListing={curListing}/>
      </Paper>
    </div>
  );
}

export default App;

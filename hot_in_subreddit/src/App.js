import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import InputForm from './components/InputForm';
import PaginationBtns from './components/PaginationBtns';
import HotPosts from './components/HotPosts';

const useStyles = makeStyles(() => ({
  root: {
    margin: '20px auto',
    width: 1000,
  },
}));

function App() {
  const emptyListing = { data: { children: [] } };
  const [curListing, changeCurListing] = useState(emptyListing);
  const [isLoading, setIsLoading] = useState(false);

  async function getHotPosts(subreddit, params) {
    const url = `https://www.reddit.com/r/${subreddit}/hot.json`;
    const resp = await fetch(url + params);
    if (resp.status === 200) {
      const data = await resp.json();
      changeCurListing(data);
    } else {
      changeCurListing(emptyListing);
    }
    setIsLoading(false);
  }

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <InputForm
          getHotPosts={getHotPosts}
          setIsLoading={setIsLoading}
        />
        <PaginationBtns
          getHotPosts={getHotPosts}
          curListing={curListing}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <HotPosts curListing={curListing} />
      </Paper>
    </div>
  );
}

export default App;

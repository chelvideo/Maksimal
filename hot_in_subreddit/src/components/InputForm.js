import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '& > div': {
      margin: theme.spacing(1),
      width: '50ch',
    },
  },
}));

function inputSubreddit(props) {
  const subreddit = document.querySelector('#subreddit');
  props.setIsLoading(true);
  props.getHotPosts(subreddit.value, '');
}

function InputForm(props) {
  const classes = useStyles();
  return (
    <form className={classes.root} noValidate>
      <TextField id="subreddit" label="Subreddit" />
      <Button variant="contained" onClick={() => inputSubreddit(props)}>Show hot</Button>
    </form>
  );
}

export default InputForm;

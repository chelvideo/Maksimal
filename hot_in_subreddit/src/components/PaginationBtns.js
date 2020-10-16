import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
    },
}));

function changeListing(props, direction) {
    const subreddit = document.querySelector('#subreddit');
    const params = `?${direction}=${props.curListing.data[direction]}&count=25`;
    props.getHotPosts(subreddit.value, params);
}

function PaginationBtns(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <IconButton color="primary" component="span" onClick={() => changeListing(props, 'before')}>
                <ArrowBackIosIcon />
            </IconButton>
            <IconButton color="primary" component="span" onClick={() => changeListing(props, 'after')}>
                <ArrowForwardIosIcon />
            </IconButton>
        </div>
    );
}

export default PaginationBtns;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        '& > .posLoader': {
            height: '40px',
            width: '40px',
        },
    },
}));

function changeListing(props, direction) {
    let params;
    props.setIsLoading(true);
    const subreddit = document.querySelector('#subreddit');
    if (props.curListing.data[direction] !== null) {
        params = `?${direction}=${props.curListing.data[direction]}&count=25`;
    }   else {params = ''}
    props.getHotPosts(subreddit.value, params);
}

function PaginationBtns(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Tooltip title="Previous" placement="left">
                <IconButton color="primary" onClick={() => changeListing(props, 'before')}>
                    <ArrowBackIosIcon />
                </IconButton>
            </Tooltip>
            {!props.isLoading && <div className="posLoader"></div>}
            {props.isLoading && <CircularProgress />}
            <Tooltip title="Next" placement="right">
                <IconButton color="primary" onClick={() => changeListing(props, 'after')}>
                    <ArrowForwardIosIcon />
                </IconButton>
            </Tooltip>
        </div>
    );
}

export default PaginationBtns;
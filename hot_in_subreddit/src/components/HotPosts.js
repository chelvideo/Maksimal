import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  root: {
    '& a': {
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
}));

function ListItemLink(listing) {
  return (
    listing.map((item) => {
      const date = new Date(item.data.created_utc * 1000);
      const ddmmyyyy = [date.getDate(), date.getMonth() + 1, date.getFullYear()]
        .map((n) => (n < 10 ? `0${n}` : `${n}`)).join('-');
      return (
        <li key={item.data.id}>
          <ListItem button component="a" href={item.data.url}>
            <ListItemText
              primary={item.data.title}
              secondary={`Posted by ${item.data.author} at ${ddmmyyyy}`}
            />
          </ListItem>
        </li>
      );
    })
  );
}

function HotPosts(props) {
  const classes = useStyles();
  const { curListing: { data: { children } } } = props;
  return (
    <List className={classes.root}>
      {ListItemLink(children)}
    </List>
  );
}

export default HotPosts;

HotPosts.defaultProps = {
  curListing: { data: { children: [] } },
};

HotPosts.propTypes = {
  curListing: PropTypes.oneOfType([PropTypes.object]),
};

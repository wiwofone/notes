import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import { StyleSheet, css } from 'aphrodite';
import { NEW_NOTE_DEFAULT_TITLE, NEW_NOTE_DEFAULT_EXCERPT } from '../defaults';

const propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  updatedAt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    background: 'transparent',
    padding: '15px 20px',
    borderBottom: '1px solid rgb(230, 232, 235)',
    fontFamily: 'PT Sans',
    display: 'block',
    cursor: 'hand',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    height: '14px',
    lineHeight: '14px',
    color: 'rgb(77, 88, 101)',
  },
  description: {
    fontSize: '13px',
    height: '22px',
    lineHeight: '22px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: 'rgb(99, 114, 130)',
  },
  timestamp: {
    marginRight: '5px',
    fontSize: '10px',
    background: 'rgb(193, 199, 205)',
    padding: '2px 3px',
    color: '#fff',
    lineHeight: '14px',
    borderRadius: '2px',
  },
});

const formatExcerpt = (content, length) => (
  content ? `${content.slice(0, length)}${content.length > length ? '...' : ''}` : NEW_NOTE_DEFAULT_EXCERPT
);

const formatTimestamp = timestamp => (
  moment(timestamp).format('YYYY-MM-DD')
);

const NoteListItem = ({ title, content, updatedAt, onClick }) => (
  <li>
    <Link
      onClick={onClick}
      className={css(styles.container)}
    >
      <h1 className={css(styles.title)}>
        { title || NEW_NOTE_DEFAULT_TITLE }
      </h1>
      <div className={css(styles.description)}>
        <span className={css(styles.timestamp)}>
          { formatTimestamp(updatedAt) }
        </span>
        { formatExcerpt(content, 100) }
      </div>
    </Link>
  </li>
);

NoteListItem.propTypes = propTypes;

export default NoteListItem;

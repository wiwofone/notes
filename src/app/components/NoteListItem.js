import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import { StyleSheet, css } from 'aphrodite';

const propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  updatedAt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    background: '#ccc',
    padding: '15px 20px',
    borderBottom: '1px solid #000',
    fontFamily: 'Fira Sans',
    display: 'block',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    height: '14px',
    lineHeight: '14px',
  },
  description: {
    fontSize: '13px',
    height: '13px',
    lineHeight: '13px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  timestamp: {
    marginRight: '5px',
  },
});

const formatExcerpt = (content, length) => (
  `${content.slice(0, length)}${content.length > length ? '...' : ''}`
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
        { title }
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

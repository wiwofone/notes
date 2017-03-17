import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import { StyleSheet, css } from 'aphrodite';
import { NEW_NOTE_DEFAULT_TITLE, NEW_NOTE_DEFAULT_EXCERPT } from '../defaults';
import { typography, palette } from '../theme';

const propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  updatedAt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  li: {
    borderBottom: `1px solid ${palette.panelHighlight}`,

    ':last-child': {
      borderBottom: '0',
    },
  },
  container: {
    background: 'transparent',
    padding: '15px 20px',
    fontFamily: typography.fonts.primary,
    display: 'block',
    cursor: 'hand',
  },
  active: {
    background: palette.panelHighlight,
  },
  title: {
    fontWeight: 'bold',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    height: '16px',
    lineHeight: '16px',
    color: palette.text,
  },
  description: {
    fontSize: '13px',
    height: '22px',
    lineHeight: '22px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: palette.legend,
  },
  timestamp: {
    marginRight: '5px',
    fontSize: '10px',
    background: 'transparent',
    border: '1px solid currentColor',
    padding: '2px 3px',
    color: palette.accent,
    lineHeight: '14px',
    borderRadius: '3px',
  },
});

const formatExcerpt = (content, length) => (
  content ? `${content.slice(0, length)}${content.length > length ? '...' : ''}` : NEW_NOTE_DEFAULT_EXCERPT
);

const formatTimestamp = timestamp => (
  moment(timestamp).format('YYYY-MM-DD')
);

const NoteListItem = ({ title, content, updatedAt, onClick, isActive }) => (
  <li className={css(styles.li)}>
    <Link
      onClick={onClick}
      className={isActive ? css(styles.container, styles.active) : css(styles.container)}
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

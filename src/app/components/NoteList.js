import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import NoteListItem from './NoteListItem';

const propTypes = {
  notes: PropTypes.array.isRequired,
  onClickNote: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  list: {
    background: 'transparent',
    flex: '1',
    overflowX: 'scroll',
  },
});

const NoteList = ({ notes, onClickNote }) => (
  <ul className={css(styles.list)}>
    { notes.map(note => (
      <NoteListItem
        key={note.id}
        onClick={() => onClickNote(note.id)}
        {...note}
      />
    ))}
  </ul>
);

NoteList.propTypes = propTypes;

export default NoteList;

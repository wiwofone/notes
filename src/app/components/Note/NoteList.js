import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import NoteListItem from './NoteListItem';

const propTypes = {
  notes: PropTypes.array.isRequired,
  onClickNote: PropTypes.func.isRequired,
  activeNoteId: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  list: {
    background: 'transparent',
    flex: '1',
    'overflow-y': 'auto',
    'overflow-x': 'hidden',
  },
});

const NoteList = ({ notes, onClickNote, activeNoteId }) => (
  <ul className={css(styles.list)}>
    { notes.map((note) => {
      const isActive = activeNoteId === note.id;
      return (
        <NoteListItem
          key={note.id}
          onClick={() => onClickNote(note.id)}
          isActive={isActive}
          {...note}
        />
      );
    })}
  </ul>
);

NoteList.propTypes = propTypes;

export default NoteList;

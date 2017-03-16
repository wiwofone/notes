import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import moment from 'moment';
import { MdDelete, MdNoteAdd } from 'react-icons/lib/md';
import NoteList from '../components/NoteList';
import NoteEditor from '../components/NoteEditor';
import Button from '../components/Button';
import { addNote, updateNote, deleteNote } from '../actions/notes';
import { NEW_NOTE_TITLE, NEW_NOTE_CONTENT } from '../defaults';

const propTypes = {
  onAddNote: PropTypes.func.isRequired,
  onUpdateNote: PropTypes.func.isRequired,
  onDeleteNote: PropTypes.func.isRequired,
  notes: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
  },
  panel: {
    flex: '1 0 0',
    background: 'rgb(247, 249, 250)',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '205px',
  },
  editor: {
    flex: '4 0 0',
    display: 'flex',
    background: '#fff',
    padding: '25px 30px',
  },
  toolbar: {
    padding: '10px',
    display: 'flex',
    justifyContent: 'center',
  },
});

/* Use moments diff function to create a sorting strategy with latest first */
const sortByDate = (a, b) => (
  moment(b.updatedAt).diff(a.updatedAt)
);

/* Tries to guess the note ID that is or should be active by first looking at
   the route params, if not then the topmost note by date created, if not then
   an empty string */
const getActiveId = (props) => {
  const paramsId = parseInt((props && props.params && props.params.noteId), 10);
  const latestId = (props && props.notes && props.notes.concat().sort(sortByDate)[0].id);
  return paramsId || latestId || '';
};

const redirectToNote = noteId => (
  browserHistory.push(`/${noteId}`)
);

const isNoteActiveAndNew = note => (
  note && note.title === NEW_NOTE_TITLE && note.content === NEW_NOTE_CONTENT
);

class Notes extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.notes.length === 0) {
      this.props.onAddNote();
    }
  }

  getActiveNote() {
    const activeNote = this.props.notes.find(
      note => note.id === getActiveId(this.props)
    );
    return activeNote;
  }

  render() {
    const { notes, onAddNote, onUpdateNote, onDeleteNote } = this.props;
    const sortedNotes = notes.concat().sort(sortByDate);
    const activeNote = this.getActiveNote();
    const isActiveNoteNew = isNoteActiveAndNew(activeNote);
    const isActiveNoteNewAndOnly = isActiveNoteNew && notes.length === 1;

    const redirectToNoteAndDelete = (noteId, prevNote) => {
      if (isNoteActiveAndNew(prevNote) && (noteId) !== prevNote.id) {
        onDeleteNote(prevNote.id);
      }
      redirectToNote(noteId);
    };

    return (
      <div className={css(styles.container)}>
        <div className={css(styles.panel)}>
          <div className={css(styles.toolbar)}>
            <Button
              style={styles.toolbarButton}
              onPress={onAddNote}
              disabled={isActiveNoteNew}
              title={<MdNoteAdd />}
              color={'rgb(85, 134, 236)'}
            />
            {
              activeNote &&
              <Button
                style={styles.toolbarButton}
                onPress={() => onDeleteNote(activeNote.id)}
                title={<MdDelete />}
                color={'rgb(85, 134, 236)'}
                disabled={isActiveNoteNewAndOnly}
              />
            }
          </div>
          <NoteList
            notes={sortedNotes}
            onClickNote={noteId => redirectToNoteAndDelete(noteId, activeNote)}
            activeNoteId={(activeNote && activeNote.id) || 0}
          />
        </div>
        <div className={css(styles.editor)}>
          { activeNote &&
            <NoteEditor
              note={activeNote}
              onContentChange={onUpdateNote}
              focusTitle={isActiveNoteNew}
            />
          }
        </div>
      </div>
    );
  }
}

Notes.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    notes: state.notes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAddNote: () => {
      const note = {
        id: Math.ceil(Math.random() * 100000),
        updatedAt: moment().format(),
      };

      dispatch(addNote(note));
      redirectToNote(note.id);
    },
    onUpdateNote: (updatedNote) => {
      dispatch(updateNote(updatedNote));
    },
    onDeleteNote: (noteId) => {
      dispatch(deleteNote(noteId));
      redirectToNote('');
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notes);

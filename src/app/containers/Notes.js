import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import moment from 'moment';
import NoteList from '../components/NoteList';
import NoteEditor from '../components/NoteEditor';
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
    background: '#eee',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '205px',
  },
  editor: {
    flex: '4 0 0',
    background: '#ddd',
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

class Notes extends React.Component {
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
    const isActiveNoteNew = activeNote
                            && activeNote.title === NEW_NOTE_TITLE
                            && activeNote.content === NEW_NOTE_CONTENT;

    return (
      <div className={css(styles.container)}>
        <div className={css(styles.panel)}>
          <div>
            <button
              onClick={onAddNote}
              disabled={isActiveNoteNew}
            >
              {'Add new note'}
            </button>
            {
              activeNote &&
              <button onClick={() => onDeleteNote(activeNote.id)}>
                {'Delete note'}
              </button>
            }
          </div>
          <NoteList
            notes={sortedNotes}
            onClickNote={redirectToNote}
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

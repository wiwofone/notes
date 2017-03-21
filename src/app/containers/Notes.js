import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import moment from 'moment';
import { palette } from '../theme';
import NoteList from '../components/Note/NoteList';
import NoteEditor from '../components/Note/NoteEditor';
import Button from '../components/UI/Button';
import { addNote, updateNote, deleteNote } from '../actions/notes';

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
    background: palette.panel,
    display: 'flex',
    flexDirection: 'column',
    minWidth: '205px',
  },
  editor: {
    flex: '4 0 0',
    display: 'flex',
    background: palette.editor,
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
  note && (!note.title && !note.content)
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
          <NoteList
            notes={sortedNotes}
            onClickNote={noteId => redirectToNoteAndDelete(noteId, activeNote)}
            activeNoteId={(activeNote && activeNote.id) || 0}
          />
          <div className={css(styles.toolbar)}>
            <Button
              style={styles.toolbarButton}
              onPress={onAddNote}
              disabled={isActiveNoteNew}
              title={'Add note'}
              invert
            />
            {
              activeNote &&
              <Button
                style={styles.toolbarButton}
                onPress={() => onDeleteNote(activeNote.id)}
                title={'Delete note'}
                disabled={isActiveNoteNewAndOnly}
                invert
              />
            }
          </div>
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

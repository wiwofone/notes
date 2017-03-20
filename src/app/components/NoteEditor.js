import React, { PropTypes } from 'react';
import moment from 'moment';
import { StyleSheet, css } from 'aphrodite';
import DraftEditor from './DraftEditor';
import { typography, palette } from '../theme';

const propTypes = {
  note: PropTypes.object.isRequired,
  onContentChange: PropTypes.func.isRequired,
  focusTitle: PropTypes.bool,
};

const styles = StyleSheet.create({
  editor: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    fontFamily: typography.fonts.primary,
    color: palette.text,
  },
  timestamp: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '12px',
    color: palette.textSecondary,
  },
  title: {
    border: 0,
    outline: 'none',
    fontSize: '32px',
    margin: '8px 0',
    color: 'inherit',
    fontFamily: 'inherit',
    padding: '0',
    fontWeight: 'bold',
  },
  content: {
    border: 0,
    fontSize: '16px',
    outline: 'none',
    lineHeight: '150%',
    flex: '1',
    color: 'inherit',
    fontFamily: 'inherit',
    padding: '0',
  },
});

const NoteEditor = ({ note, onContentChange, focusTitle }) => {
  let contentEditor;
  let titleEditor;

  const updatedAt = moment(note.updatedAt).format('D MMMM YYYY [at] HH:mm');

  const handleTitleChange = () => (
    onContentChange({
      id: note.id,
      title: titleEditor.value,
      updatedAt: moment().format(),
    })
  );

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      contentEditor.focus();
    }
  };

  const handleContentChange = (content, excerpt) => (
    onContentChange({
      id: note.id,
      content,
      excerpt,
      updatedAt: moment().format(),
    })
  );

  return (
    <div
      className={css(styles.editor)}
      key={note.id}
    >
      <div className={css(styles.timestamp)}>
        { updatedAt }
      </div>
      <input
        className={css(styles.title)}
        defaultValue={note.title}
        onChange={handleTitleChange}
        ref={(input) => { titleEditor = input; }}
        autoFocus={focusTitle}
        onKeyPress={handleEnterPress}
      />
      <DraftEditor
        onChange={handleContentChange}
        defaultValue={note.content}
        ref={(draftEditor) => { contentEditor = draftEditor; }}
      />
    </div>
  );
};

NoteEditor.propTypes = propTypes;

export default NoteEditor;

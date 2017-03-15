import React, { PropTypes } from 'react';
import moment from 'moment';
import { StyleSheet, css } from 'aphrodite';

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
    fontFamily: 'PT Sans',
    color: 'rgb(77, 88, 101)',
  },
  timestamp: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '12px',
  },
  title: {
    border: 0,
    outline: 'none',
    fontSize: '32px',
    marginBottom: '16px',
  },
  content: {
    border: 0,
    fontSize: '16px',
    outline: 'none',
    lineHeight: '150%',
    flex: '1',
  },
});

const NoteEditor = ({ note, onContentChange, focusTitle }) => {
  let contentEditor;
  let titleEditor;

  const updatedAt = moment(note.updatedAt).format('D MMMM YYYY [at] HH:mm');

  const handleContentChange = () => (
    onContentChange({
      id: note.id,
      content: contentEditor.value,
      title: titleEditor.value,
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
        onChange={handleContentChange}
        ref={(input) => { titleEditor = input; }}
        autoFocus={focusTitle}
      />
      <textarea
        className={css(styles.content)}
        defaultValue={note.content}
        onChange={handleContentChange}
        ref={(textarea) => { contentEditor = textarea; }}
      />
    </div>
  );
};

NoteEditor.propTypes = propTypes;

export default NoteEditor;

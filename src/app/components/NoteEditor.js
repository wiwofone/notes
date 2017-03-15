import React, { PropTypes } from 'react';
import moment from 'moment';

const propTypes = {
  note: PropTypes.object.isRequired,
  onContentChange: PropTypes.func.isRequired,
  focusTitle: PropTypes.bool,
};

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
    <div key={note.id}>
      { updatedAt }
      <input
        defaultValue={note.title}
        onChange={handleContentChange}
        ref={(input) => { titleEditor = input; }}
        autoFocus={focusTitle}
      />
      <textarea
        defaultValue={note.content}
        onChange={handleContentChange}
        ref={(textarea) => { contentEditor = textarea; }}
      />
    </div>
  );
};

NoteEditor.propTypes = propTypes;

export default NoteEditor;

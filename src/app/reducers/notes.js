import { ADD_NOTE, UPDATE_NOTE, DELETE_NOTE } from '../actions/notes';
import { NEW_NOTE_TITLE, NEW_NOTE_CONTENT } from '../defaults';

const notes = (state = [], action) => {
  switch (action.type) {
    case ADD_NOTE:
      return [
        ...state,
        {
          id: action.note.id,
          title: NEW_NOTE_TITLE,
          content: NEW_NOTE_CONTENT,
          updatedAt: action.note.updatedAt,
        },
      ];
    case UPDATE_NOTE:
      return state.map((note) => {
        if (note.id !== action.note.id) {
          return note;
        }

        return {
          ...note,
          ...action.note,
        };
      });
    case DELETE_NOTE:
      return state.filter(note => note.id !== action.noteId);
    default:
      return state;
  }
};

export default notes;
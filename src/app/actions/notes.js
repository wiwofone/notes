export const ADD_NOTE = 'ADD_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';

export function addNote(note) {
  return { type: ADD_NOTE, note };
}

export function updateNote(note) {
  return { type: UPDATE_NOTE, note };
}

export function deleteNote(noteId) {
  return { type: DELETE_NOTE, noteId };
}

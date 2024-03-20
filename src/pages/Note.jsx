import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useAction, getNote, updateNote, deleteNote } from 'wasp/client/operations';

const NotePage = () => {
  const { noteId } = useParams();
  const { data: note, isLoading, error } = useQuery(getNote, { id: parseInt(noteId) });
  const updateNoteFn = useAction(updateNote);
  const deleteNoteFn = useAction(deleteNote);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleUpdateNote = (updatedNote) => {
    updateNoteFn(updatedNote);
  };

  const handleDeleteNote = () => {
    deleteNoteFn({ noteId: parseInt(noteId) });
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold my-4'>{note.description}</h1>
      <p className='my-2'>{note.content}</p>
      <div className='my-4'>
        <button
          onClick={handleDeleteNote}
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4'
        >
          Delete
        </button>
        <Link to={`/edit-note/${note.id}`} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Edit</Link>
      </div>
    </div>
  );
}

export default NotePage;
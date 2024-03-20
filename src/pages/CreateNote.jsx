import React, { useState } from 'react';
import { useAction, createNote } from 'wasp/client/operations';
import { Link } from 'react-router-dom';

const CreateNotePage = () => {
  const createNoteFn = useAction(createNote);
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const handleCreateNote = () => {
    createNoteFn({ description, content, isPublic });
  };

  return (
    <div className='p-4'>
      <input
        type='text'
        placeholder='Title'
        className='mb-4 px-4 py-2 border rounded'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <textarea
        placeholder='Take a note...'
        className='mb-4 px-4 py-2 border rounded'
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <label className='inline-flex items-center mt-4'>
        <input
          type='checkbox'
          className='form-checkbox h-5 w-5 text-blue-600'
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        <span className='ml-2 text-gray-700'>Make note public</span>
      </label>
      <button
        onClick={handleCreateNote}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
      >
        Create Note
      </button>
    </div>
  );
}

export default CreateNotePage;
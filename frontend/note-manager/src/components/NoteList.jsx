import React from 'react';
import { deleteNote } from '../api/api';
import { toast } from 'react-toastify';

function NoteList({
  notes,
  setNotes,
  setSelectedNote,
  isLoading,
  isSearching,
  search,
}) {
  const handleDelete = async (id) => {
    try {
        alert('Are you sure you want to delete this note?');
      await deleteNote(id);
      setNotes(notes.filter((note) => note._id !== id));
      toast.success('Note deleted successfully!');
    } catch (error) {
      console.error('Error deleting note:', error);
      toast.error('Failed to delete note.');
    }
  };

  return (
    <div className="bg-teal-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-white">Notes</h2>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : isSearching && search !== '' ? (
        <div className="flex justify-start items-start">
          
            Searching...
          
        </div>
      ) : search !== '' && notes.length === 0 ? (
        <p className="text-white">No results found</p>
      ) : notes.length === 0 ? (
        <p className="text-white">No notes available</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li
              key={note._id}
              className="bg-teal-700 p-4 rounded-lg mb-3 flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-white">{note.title}</h3>
                <p className="text-[#E9C46A]">{note.description}</p>
                <span className="text-sm text-[#E9C46A]">
                  {note.category}
                </span>
              </div>
              <div>
                <button
                  onClick={() => setSelectedNote(note)}
                  className="px-4 py-2 text-white bg-[#e0b65c] rounded hover:bg-[#e0b65c] mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NoteList;